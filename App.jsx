import { useState, useEffect, useMemo } from "react";
import {
  ChefHat,
  Refrigerator,
  ChevronDown,
  X,
  Plus,
  Check,
  Heart,
  ShoppingCart,
  Minus,
  Trash2,
  SlidersHorizontal,
  Camera,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { CATEGORIES, CUISINE_EMOJI, CUISINES, VIANDE_POISSON, PORC, GLUTEN, LACTOSE, OEUFS, ALL_INGREDIENTS } from "./data/ingredients";
import RECIPES from "./data/recipes";
import { norm, hasAny, arrondir, formatQty } from "./utils";

export default function FrigoFute() {
  const [selected, setSelected] = useState(new Set());
  const [customInput, setCustomInput] = useState("");
  const [customChips, setCustomChips] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [favoris, setFavoris] = useState(new Set());
  const [dejaFaites, setDejaFaites] = useState(new Set());
  const [portionsMap, setPortionsMap] = useState({});
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showFiltres, setShowFiltres] = useState(false);

  const [filtreRegime, setFiltreRegime] = useState("tous");
  const [filtreSansPorc, setFiltreSansPorc] = useState(false);
  const [filtreAllergenes, setFiltreAllergenes] = useState(new Set());
  const [filtreTemps, setFiltreTemps] = useState("tous");
  const [filtreDifficulte, setFiltreDifficulte] = useState("tous");
  const [filtreFavorisSeulement, setFiltreFavorisSeulement] = useState(false);
  const [filtreCategorie, setFiltreCategorie] = useState("tous");
  const [filtreCuisine, setFiltreCuisine] = useState("toutes");

  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [scanResume, setScanResume] = useState(null); // { trouves: [], autres: [] }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("frigo:donnees");
      if (raw) {
        const d = JSON.parse(raw);
        setSelected(new Set(d.selected || []));
        setCustomChips(d.customChips || []);
        setFavoris(new Set(d.favoris || []));
        setDejaFaites(new Set(d.dejaFaites || []));
        setCourses(d.courses || []);
      }
    } catch (e) {
      // pas encore de données sauvegardées, ou stockage indisponible
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        "frigo:donnees",
        JSON.stringify({ selected: Array.from(selected), customChips, favoris: Array.from(favoris), dejaFaites: Array.from(dejaFaites), courses })
      );
    } catch (e) {
      // stockage plein ou indisponible (navigation privée par ex.)
    }
  }, [selected, customChips, favoris, dejaFaites, courses, loaded]);

  const toggle = (item) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (!val) return;
    const exists = customChips.some((c) => norm(c) === norm(val));
    if (!exists) setCustomChips((prev) => [...prev, val]);
    setSelected((prev) => new Set(prev).add(val));
    setCustomInput("");
  };

  const removeCustom = (item) => {
    setCustomChips((prev) => prev.filter((c) => c !== item));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
      reader.readAsDataURL(file);
    });

  const analyserTicket = async (file) => {
    setScanLoading(true);
    setScanError(null);
    setScanResume(null);
    try {
      const base64 = await fileToBase64(file);
      const mediaType = file.type || "image/jpeg";

      // Le prompt et la clé API restent côté serveur (voir api/analyser-ticket.js) :
      // le navigateur n'envoie que l'image, jamais de clé secrète.
      const response = await fetch("/api/analyser-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, mediaType }),
      });

      if (!response.ok) throw new Error("Erreur API");
      const parsed = await response.json();

      const trouves = Array.isArray(parsed.trouves) ? parsed.trouves.filter((t) => ALL_INGREDIENTS.includes(t)) : [];
      const autres = Array.isArray(parsed.autres) ? [...new Set(parsed.autres.map((a) => a.trim()).filter(Boolean))] : [];

      setSelected((prev) => {
        const next = new Set(prev);
        trouves.forEach((t) => next.add(t));
        autres.forEach((a) => next.add(a));
        return next;
      });
      setCustomChips((prev) => {
        const existingNorm = new Set(prev.map(norm));
        const nouveaux = autres.filter((a) => !existingNorm.has(norm(a)));
        return [...prev, ...nouveaux];
      });

      setScanResume({ trouves, autres });
    } catch (e) {
      setScanError("Impossible d'analyser cette photo. Réessayez avec une image plus nette, ou ajoutez les ingrédients manuellement.");
    } finally {
      setScanLoading(false);
    }
  };

  const toggleFavori = (nom) => setFavoris((prev) => { const n = new Set(prev); n.has(nom) ? n.delete(nom) : n.add(nom); return n; });
  const toggleDejaFaite = (nom) => setDejaFaites((prev) => { const n = new Set(prev); n.has(nom) ? n.delete(nom) : n.add(nom); return n; });
  const toggleAllergene = (a) => setFiltreAllergenes((prev) => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });

  const getPortions = (nom) => portionsMap[nom] ?? 2;
  const setPortions = (nom, val) => setPortionsMap((prev) => ({ ...prev, [nom]: Math.max(1, Math.min(12, val)) }));

  const ajouterALaListe = (recette, manquants) => {
    const portions = getPortions(recette.nom);
    setCourses((prev) => {
      const next = [...prev];
      manquants.forEach((ing) => {
        const qty = ing.qty == null ? null : arrondir((ing.qty * portions) / 2);
        const idx = next.findIndex((c) => c.ingredient === ing.nom);
        if (idx >= 0) {
          next[idx] = { ...next[idx], qty: qty != null && next[idx].qty != null ? next[idx].qty + qty : next[idx].qty };
        } else {
          next.push({ ingredient: ing.nom, qty, unite: ing.unite });
        }
      });
      return next;
    });
  };

  const retirerDeLaListe = (ing) => setCourses((prev) => prev.filter((c) => c.ingredient !== ing));
  const viderListe = () => setCourses([]);

  const ranked = useMemo(() => {
    const selNorm = new Set(Array.from(selected).map(norm));
    let list = RECIPES.map((r) => {
      const names = r.ingredients.map((i) => i.nom);
      const matched = names.filter((n) => selNorm.has(norm(n)));
      const missing = r.ingredients.filter((i) => !selNorm.has(norm(i.nom)));
      return { ...r, names, matchedCount: matched.length, missing, score: matched.length / names.length };
    });

    if (filtreRegime === "vegetarien") list = list.filter((r) => !hasAny(r.names, VIANDE_POISSON));
    if (filtreSansPorc) list = list.filter((r) => !hasAny(r.names, PORC));
    if (filtreAllergenes.has("gluten")) list = list.filter((r) => !hasAny(r.names, GLUTEN));
    if (filtreAllergenes.has("lactose")) list = list.filter((r) => !hasAny(r.names, LACTOSE));
    if (filtreAllergenes.has("oeufs")) list = list.filter((r) => !hasAny(r.names, OEUFS));
    if (filtreTemps !== "tous") list = list.filter((r) => r.dureeMin <= Number(filtreTemps));
    if (filtreDifficulte !== "tous") list = list.filter((r) => r.difficulte === filtreDifficulte);
    if (filtreFavorisSeulement) list = list.filter((r) => favoris.has(r.nom));
    if (filtreCategorie !== "tous") list = list.filter((r) => r.categorie === filtreCategorie);
    if (filtreCuisine !== "toutes") list = list.filter((r) => r.cuisine === filtreCuisine);

    return list.sort((a, b) => {
      if (a.missing.length === 0 && b.missing.length !== 0) return -1;
      if (b.missing.length === 0 && a.missing.length !== 0) return 1;
      if (b.score !== a.score) return b.score - a.score;
      return a.missing.length - b.missing.length;
    });
  }, [selected, filtreRegime, filtreSansPorc, filtreAllergenes, filtreTemps, filtreDifficulte, filtreFavorisSeulement, favoris, filtreCategorie, filtreCuisine]);

  const hasSelection = selected.size > 0;
  const displayed = hasSelection ? ranked.filter((r) => r.matchedCount > 0) : ranked;
  const nbFiltresActifs =
    (filtreRegime !== "tous" ? 1 : 0) + (filtreSansPorc ? 1 : 0) + filtreAllergenes.size + (filtreTemps !== "tous" ? 1 : 0) +
    (filtreDifficulte !== "tous" ? 1 : 0) + (filtreFavorisSeulement ? 1 : 0) + (filtreCategorie !== "tous" ? 1 : 0) + (filtreCuisine !== "toutes" ? 1 : 0);

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .chip { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .chip:hover { transform: translateY(-2px); }
        .recipe-card { transition: box-shadow 0.15s ease, transform 0.15s ease; }
        .recipe-card:hover { transform: translateY(-2px); }
        .filtre-pill { transition: background 0.12s ease; }
        .expand-btn:focus-visible, .chip:focus-visible, input:focus-visible, button:focus-visible {
          outline: 2px solid #1F3327; outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) { .chip, .recipe-card { transition: none !important; } }
        .spin { animation: frigo-spin 0.9s linear infinite; }
        @keyframes frigo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <div style={styles.iconBadge}><Refrigerator size={22} color="#F7F5EC" strokeWidth={2} /></div>
            <div>
              <h1 style={styles.title}>Frigo Futé</h1>
              <p style={styles.subtitle}>Cochez ce que vous avez, on trouve quoi cuisiner.</p>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.scanSection}>
          <div style={styles.scanRow}>
            <div>
              <div style={styles.scanTitle}>📷 Scanner un ticket de caisse</div>
              <div style={styles.scanSubtitle}>Prenez en photo votre ticket ou votre liste de courses, on remplit le frigo pour vous.</div>
            </div>
            <label style={{ ...styles.scanBtn, ...(scanLoading ? styles.scanBtnDisabled : {}) }}>
              {scanLoading ? <Loader2 size={16} className="spin" /> : <Camera size={16} />}
              {scanLoading ? "Analyse en cours…" : "Prendre / choisir une photo"}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                disabled={scanLoading}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) analyserTicket(file);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          {scanError && (
            <div style={styles.scanError}><AlertCircle size={15} />{scanError}</div>
          )}

          {scanResume && (
            <div style={styles.scanResult}>
              <strong>{scanResume.trouves.length + scanResume.autres.length} ingrédient{scanResume.trouves.length + scanResume.autres.length > 1 ? "s" : ""} ajouté{scanResume.trouves.length + scanResume.autres.length > 1 ? "s" : ""} au frigo</strong>
              {scanResume.trouves.length + scanResume.autres.length > 0 && (
                <div style={styles.chipRow}>
                  {[...scanResume.trouves, ...scanResume.autres].map((a) => (
                    <span key={a} style={styles.scanChip}>{a}</span>
                  ))}
                </div>
              )}
              <div style={{ fontSize: "0.78rem", color: "#5B6B5E", marginTop: 6 }}>Vous pouvez décocher ci-dessous ce qui ne correspond pas.</div>
            </div>
          )}
        </section>

        <section style={styles.fridgeSection}>
          <h2 style={styles.sectionTitle}>Mon frigo</h2>
          {Object.entries(CATEGORIES).map(([cat, items]) => (
            <div key={cat} style={styles.catBlock}>
              <div style={styles.catLabel}>{cat}</div>
              <div style={styles.chipRow}>
                {items.map((item) => {
                  const active = selected.has(item);
                  return (
                    <button key={item} className="chip" onClick={() => toggle(item)} style={{ ...styles.chip, ...(active ? styles.chipActive : {}) }}>
                      {active && <Check size={13} style={{ marginRight: 5 }} strokeWidth={3} />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {customChips.length > 0 && (
            <div style={styles.catBlock}>
              <div style={styles.catLabel}>Ajoutés par vous</div>
              <div style={styles.chipRow}>
                {customChips.map((item) => {
                  const active = selected.has(item);
                  return (
                    <div key={item} style={{ display: "inline-flex", alignItems: "center" }}>
                      <button className="chip" onClick={() => toggle(item)} style={{ ...styles.chip, ...(active ? styles.chipActive : {}), borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        {active && <Check size={13} style={{ marginRight: 5 }} strokeWidth={3} />}
                        {item}
                      </button>
                      <button onClick={() => removeCustom(item)} aria-label={`Retirer ${item}`} style={styles.chipRemove}><X size={13} strokeWidth={3} /></button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={styles.addRow}>
            <input value={customInput} onChange={(e) => setCustomInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustom()} placeholder="Autre ingrédient (ex : épinards frais)" style={styles.input} />
            <button onClick={addCustom} style={styles.addBtn}><Plus size={16} strokeWidth={2.5} />Ajouter</button>
          </div>
        </section>

        {courses.length > 0 && (
          <section style={styles.coursesPanel}>
            <div style={styles.coursesHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShoppingCart size={18} color="#1F3327" />
                <h2 style={{ ...styles.sectionTitle, margin: 0 }}>Ma liste de courses</h2>
              </div>
              <button onClick={viderListe} style={styles.viderBtn}><Trash2 size={14} /> Vider</button>
            </div>
            <div style={styles.coursesList}>
              {courses.map((c) => (
                <div key={c.ingredient} style={styles.courseItem}>
                  <span>{c.ingredient}{c.qty != null && <span style={styles.courseQty}> — {c.qty}{c.unite && ` ${c.unite}`}</span>}</span>
                  <button onClick={() => retirerDeLaListe(c.ingredient)} aria-label={`Retirer ${c.ingredient}`} style={styles.courseRemove}><X size={13} strokeWidth={3} /></button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={styles.recipeSection}>
          <div style={styles.recipeSectionHeader}>
            <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{hasSelection ? "Recettes possibles" : "Recettes populaires"}</h2>
            <span style={styles.countPill}>{displayed.length} recette{displayed.length > 1 ? "s" : ""}</span>
            <button onClick={() => setShowFiltres((v) => !v)} style={styles.filtreToggle}>
              <SlidersHorizontal size={15} />Filtres{nbFiltresActifs > 0 && <span style={styles.filtreBadge}>{nbFiltresActifs}</span>}
            </button>
          </div>

          {showFiltres && (
            <div style={styles.filtresPanel}>
              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Catégorie</div>
                <div style={styles.chipRow}>
                  {[{ v: "tous", l: "Toutes" }, { v: "Salé", l: "Salé" }, { v: "Sucré", l: "Sucré" }].map((o) => (
                    <button key={o.v} className="filtre-pill" onClick={() => setFiltreCategorie(o.v)} style={{ ...styles.filtrePill, ...(filtreCategorie === o.v ? styles.filtrePillActive : {}) }}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Cuisine du monde</div>
                <div style={styles.chipRow}>
                  <button className="filtre-pill" onClick={() => setFiltreCuisine("toutes")} style={{ ...styles.filtrePill, ...(filtreCuisine === "toutes" ? styles.filtrePillActive : {}) }}>Toutes</button>
                  {CUISINES.map((c) => (
                    <button key={c} className="filtre-pill" onClick={() => setFiltreCuisine(c)} style={{ ...styles.filtrePill, ...(filtreCuisine === c ? styles.filtrePillActive : {}) }}>{CUISINE_EMOJI[c]} {c}</button>
                  ))}
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Régime</div>
                <div style={styles.chipRow}>
                  {[{ v: "tous", l: "Tous" }, { v: "vegetarien", l: "Végétarien" }].map((o) => (
                    <button key={o.v} className="filtre-pill" onClick={() => setFiltreRegime(o.v)} style={{ ...styles.filtrePill, ...(filtreRegime === o.v ? styles.filtrePillActive : {}) }}>{o.l}</button>
                  ))}
                  <button className="filtre-pill" onClick={() => setFiltreSansPorc((v) => !v)} style={{ ...styles.filtrePill, ...(filtreSansPorc ? styles.filtrePillActive : {}) }}>Sans porc</button>
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Allergies / intolérances</div>
                <div style={styles.chipRow}>
                  {[{ v: "gluten", l: "Sans gluten" }, { v: "lactose", l: "Sans lactose" }, { v: "oeufs", l: "Sans œufs" }].map((o) => (
                    <button key={o.v} className="filtre-pill" onClick={() => toggleAllergene(o.v)} style={{ ...styles.filtrePill, ...(filtreAllergenes.has(o.v) ? styles.filtrePillActive : {}) }}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Temps de préparation</div>
                <div style={styles.chipRow}>
                  {[{ v: "tous", l: "Peu importe" }, { v: "15", l: "≤ 15 min" }, { v: "30", l: "≤ 30 min" }].map((o) => (
                    <button key={o.v} className="filtre-pill" onClick={() => setFiltreTemps(o.v)} style={{ ...styles.filtrePill, ...(filtreTemps === o.v ? styles.filtrePillActive : {}) }}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <div style={styles.filtreLabel}>Difficulté</div>
                <div style={styles.chipRow}>
                  {["tous", "Facile", "Moyen", "Avancé"].map((o) => (
                    <button key={o} className="filtre-pill" onClick={() => setFiltreDifficulte(o)} style={{ ...styles.filtrePill, ...(filtreDifficulte === o ? styles.filtrePillActive : {}) }}>{o === "tous" ? "Toutes" : o}</button>
                  ))}
                </div>
              </div>

              <div style={styles.filtreGroup}>
                <button className="filtre-pill" onClick={() => setFiltreFavorisSeulement((v) => !v)} style={{ ...styles.filtrePill, ...(filtreFavorisSeulement ? styles.filtrePillActive : {}) }}>
                  <Heart size={13} style={{ marginRight: 4 }} fill={filtreFavorisSeulement ? "#1F3327" : "none"} />Mes favoris uniquement
                </button>
              </div>
            </div>
          )}

          {displayed.length === 0 && (
            <div style={styles.emptyState}>
              <ChefHat size={28} color="#8A9A8D" style={{ marginBottom: 10 }} />
              <p style={{ margin: 0, color: "#5B6B5E" }}>Aucune recette ne correspond. Essayez d'ajuster vos filtres ou d'ajouter un ingrédient.</p>
            </div>
          )}

          <div style={styles.recipeGrid}>
            {displayed.map((r) => {
              const complete = r.missing.length === 0;
              const isOpen = expanded === r.nom;
              const portions = getPortions(r.nom);
              return (
                <div key={r.nom} className="recipe-card" style={styles.card}>
                  <div style={styles.imageWrap}>
                    <img src={r.image} alt={r.nom} style={styles.image} loading="lazy" />
                    <span style={styles.cuisineBadge}>{CUISINE_EMOJI[r.cuisine]} {r.cuisine}</span>
                    <button onClick={() => toggleFavori(r.nom)} aria-label={favoris.has(r.nom) ? "Retirer des favoris" : "Ajouter aux favoris"} style={styles.favBtn}>
                      <Heart size={17} fill={favoris.has(r.nom) ? "#B5533C" : "#FFFFFF"} color={favoris.has(r.nom) ? "#B5533C" : "#4A5A4D"} strokeWidth={2} />
                    </button>
                  </div>

                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{r.nom}</h3>
                    <div style={styles.metaRow}>
                      <span style={styles.metaTag}>{r.dureeMin} min</span>
                      <span style={styles.metaTag}>{r.difficulte}</span>
                      <span style={styles.metaTag}>{r.categorie}</span>
                      {dejaFaites.has(r.nom) && <span style={styles.metaTagDone}>Déjà testée</span>}
                    </div>

                    {hasSelection && (
                      <div style={complete ? styles.badgeReady : styles.badgeMissing}>
                        {complete ? "Prêt à cuisiner" : `Il manque ${r.missing.length} ingrédient${r.missing.length > 1 ? "s" : ""}`}
                      </div>
                    )}

                    <div style={styles.ingList}>
                      {r.ingredients.map((ing) => {
                        const missing = r.missing.some((m) => m.nom === ing.nom);
                        const q = formatQty(ing, portions);
                        return (
                          <span key={ing.nom} style={{ ...styles.ingTag, ...(hasSelection && missing ? styles.ingTagMissing : {}) }}>
                            {q ? `${q} ${ing.nom}` : ing.nom}
                          </span>
                        );
                      })}
                    </div>

                    <button className="expand-btn" onClick={() => setExpanded(isOpen ? null : r.nom)} style={styles.expandBtn}>
                      {isOpen ? "Masquer la préparation" : "Voir la préparation"}
                      <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                    </button>

                    {isOpen && (
                      <div>
                        <div style={styles.portionsRow}>
                          <span style={styles.portionsLabel}>Portions</span>
                          <div style={styles.stepper}>
                            <button onClick={() => setPortions(r.nom, portions - 1)} style={styles.stepperBtn} aria-label="Moins de portions"><Minus size={13} /></button>
                            <span style={styles.stepperVal}>{portions}</span>
                            <button onClick={() => setPortions(r.nom, portions + 1)} style={styles.stepperBtn} aria-label="Plus de portions"><Plus size={13} /></button>
                          </div>
                        </div>

                        <ol style={styles.stepsList}>
                          {r.etapes.map((etape, i) => (
                            <li key={i} style={styles.stepItem}>{etape}</li>
                          ))}
                        </ol>

                        <div style={styles.cardActions}>
                          <button onClick={() => toggleDejaFaite(r.nom)} style={styles.secondaryBtn}>
                            <Check size={14} />{dejaFaites.has(r.nom) ? "Déjà faite ✓" : "Marquer comme faite"}
                          </button>
                          {!complete && (
                            <button onClick={() => ajouterALaListe(r, r.missing)} style={styles.primaryBtn}>
                              <ShoppingCart size={14} />Ajouter le manquant à ma liste
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}


const styles = {
  page: { minHeight: "100vh", background: "#EDEFE4", fontFamily: "'Work Sans', sans-serif", color: "#1F3327", paddingBottom: 60 },
  header: { background: "#1F3327", padding: "28px 20px" },
  headerInner: { maxWidth: 960, margin: "0 auto" },
  brandRow: { display: "flex", alignItems: "center", gap: 14 },
  iconBadge: { width: 44, height: 44, borderRadius: 12, background: "#3A5240", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  title: { fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.9rem", color: "#F7F5EC", margin: 0, letterSpacing: "-0.01em" },
  subtitle: { margin: "2px 0 0", color: "#B9C4B8", fontSize: "0.92rem" },
  main: { maxWidth: 960, margin: "0 auto", padding: "28px 20px 0" },
  sectionTitle: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.25rem", margin: "0 0 14px", color: "#1F3327" },
  scanSection: { background: "#1F3327", borderRadius: 18, padding: "18px 22px", marginBottom: 16 },
  scanRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  scanTitle: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.02rem", color: "#F7F5EC" },
  scanSubtitle: { fontSize: "0.82rem", color: "#B9C4B8", marginTop: 3, maxWidth: 420 },
  scanBtn: { display: "flex", alignItems: "center", gap: 8, background: "#E4A425", color: "#3A2A05", fontWeight: 600, fontSize: "0.85rem", padding: "10px 16px", borderRadius: 10, cursor: "pointer", whiteSpace: "nowrap" },
  scanBtnDisabled: { opacity: 0.75, cursor: "default" },
  scanError: { display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: "0.82rem", color: "#F3DCD2", background: "rgba(181,83,60,0.25)", padding: "8px 12px", borderRadius: 10 },
  scanResult: { marginTop: 14, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", fontSize: "0.85rem", color: "#F7F5EC" },
  scanChip: { fontSize: "0.76rem", color: "#1F3327", background: "#F7F5EC", padding: "3px 9px", borderRadius: 8 },
  fridgeSection: { background: "#F7F5EC", borderRadius: 18, padding: "22px 22px 20px", border: "1px solid #DDE0CE" },
  catBlock: { marginBottom: 16 },
  catLabel: { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8A9A8D", marginBottom: 8 },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { display: "inline-flex", alignItems: "center", fontFamily: "'Work Sans', sans-serif", fontSize: "0.88rem", fontWeight: 500, padding: "7px 14px", borderRadius: 20, border: "1.5px solid #C9CBB8", background: "#FFFFFF", color: "#4A5A4D", cursor: "pointer", boxShadow: "0 1px 2px rgba(31,51,39,0.06)" },
  chipActive: { background: "#E4A425", borderColor: "#C98D14", color: "#3A2A05", boxShadow: "0 2px 6px rgba(228,164,37,0.35)" },
  chipRemove: { border: "1.5px solid #C9CBB8", borderLeft: "none", background: "#F0EEE2", color: "#8A9A8D", borderTopRightRadius: 20, borderBottomRightRadius: 20, height: 32, width: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  addRow: { display: "flex", gap: 8, marginTop: 18 },
  input: { flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #C9CBB8", fontSize: "0.9rem", fontFamily: "'Work Sans', sans-serif", background: "#FFFFFF", color: "#1F3327" },
  addBtn: { display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", background: "#1F3327", color: "#F7F5EC", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" },
  coursesPanel: { background: "#FFFDF8", border: "1.5px dashed #C9CBB8", borderRadius: 16, padding: "18px 20px", marginTop: 22 },
  coursesHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  viderBtn: { display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: "#B5533C", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" },
  coursesList: { display: "flex", flexDirection: "column", gap: 6 },
  courseItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", background: "#F0EEE2", borderRadius: 8, fontSize: "0.88rem" },
  courseQty: { color: "#5B6B5E" },
  courseRemove: { border: "none", background: "none", color: "#8A9A8D", cursor: "pointer", display: "flex" },
  recipeSection: { marginTop: 34 },
  recipeSectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  countPill: { fontSize: "0.78rem", color: "#5B6B5E", background: "#DDE0CE", padding: "2px 10px", borderRadius: 20 },
  filtreToggle: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: "#F7F5EC", border: "1.5px solid #C9CBB8", borderRadius: 10, padding: "6px 12px", fontSize: "0.84rem", fontWeight: 600, color: "#1F3327", cursor: "pointer" },
  filtreBadge: { background: "#B5533C", color: "#fff", fontSize: "0.7rem", borderRadius: 20, padding: "1px 7px", fontWeight: 700 },
  filtresPanel: { background: "#F7F5EC", border: "1px solid #DDE0CE", borderRadius: 14, padding: "16px 18px", marginBottom: 18, display: "flex", flexDirection: "column", gap: 14 },
  filtreGroup: {},
  filtreLabel: { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8A9A8D", marginBottom: 8 },
  filtrePill: { display: "inline-flex", alignItems: "center", fontSize: "0.84rem", fontWeight: 500, padding: "6px 13px", borderRadius: 20, border: "1.5px solid #C9CBB8", background: "#FFFFFF", color: "#4A5A4D", cursor: "pointer" },
  filtrePillActive: { background: "#1F3327", borderColor: "#1F3327", color: "#F7F5EC" },
  emptyState: { textAlign: "center", padding: "36px 20px", background: "#F7F5EC", borderRadius: 16, border: "1.5px dashed #C9CBB8" },
  recipeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  card: { position: "relative", background: "#FFFDF8", border: "1.5px solid #DDE0CE", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(31,51,39,0.06)" },
  imageWrap: { position: "relative", width: "100%", height: 150, background: "#DDE0CE" },
  image: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cuisineBadge: { position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.92)", fontSize: "0.72rem", fontWeight: 600, padding: "3px 9px", borderRadius: 20, color: "#1F3327" },
  favBtn: { position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  cardBody: { padding: "16px 18px 16px" },
  cardTitle: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.08rem", margin: "0 0 8px", color: "#1F3327" },
  metaRow: { display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" },
  metaTag: { fontSize: "0.72rem", color: "#5B6B5E", background: "#F0EEE2", padding: "2px 8px", borderRadius: 20 },
  metaTagDone: { fontSize: "0.72rem", color: "#2F5B3C", background: "#E1EDE1", padding: "2px 8px", borderRadius: 20, fontWeight: 600 },
  badgeReady: { display: "inline-block", fontSize: "0.74rem", fontWeight: 600, color: "#2F5B3C", background: "#E1EDE1", padding: "3px 10px", borderRadius: 20, marginBottom: 12 },
  badgeMissing: { display: "inline-block", fontSize: "0.74rem", fontWeight: 600, color: "#8A3A28", background: "#F3DCD2", padding: "3px 10px", borderRadius: 20, marginBottom: 12 },
  ingList: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  ingTag: { fontSize: "0.76rem", color: "#4A5A4D", background: "#F0EEE2", padding: "3px 9px", borderRadius: 8 },
  ingTagMissing: { color: "#8A3A28", background: "#F3DCD2" },
  expandBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#1F3327", fontWeight: 600, fontSize: "0.84rem", cursor: "pointer", padding: "6px 0 0" },
  stepsList: { margin: "12px 0 0", paddingLeft: 20, fontSize: "0.86rem", lineHeight: 1.6, color: "#3E4A40", display: "flex", flexDirection: "column", gap: 8 },
  stepItem: { paddingLeft: 2 },
  portionsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderTop: "1px dashed #DDE0CE", paddingTop: 12 },
  portionsLabel: { fontSize: "0.82rem", fontWeight: 600, color: "#4A5A4D" },
  stepper: { display: "flex", alignItems: "center", gap: 10, background: "#F0EEE2", borderRadius: 20, padding: "4px 8px" },
  stepperBtn: { border: "none", background: "#FFFFFF", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" },
  stepperVal: { fontSize: "0.86rem", fontWeight: 600, minWidth: 14, textAlign: "center" },
  cardActions: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 },
  secondaryBtn: { display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 600, padding: "7px 12px", borderRadius: 10, border: "1.5px solid #C9CBB8", background: "#FFFFFF", color: "#1F3327", cursor: "pointer" },
  primaryBtn: { display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 600, padding: "7px 12px", borderRadius: 10, border: "none", background: "#E4A425", color: "#3A2A05", cursor: "pointer" },
};
