// Base de recettes : 59 recettes (salé, sucré, cuisines du monde) avec quantités précises et étapes détaillées.
const img = (tags, seed) => `https://loremflickr.com/400/300/${tags}/all?lock=${seed}`;

const RECIPES = [
  { nom: "Omelette au fromage", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("omelette,cheese", 1),
    ingredients: [{ nom: "Œufs", qty: 4, unite: "" }, { nom: "Fromage râpé", qty: 60, unite: "g" }, { nom: "Beurre", qty: 15, unite: "g" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Cassez les œufs dans un saladier, ajoutez le sel et le poivre, puis battez énergiquement à la fourchette pendant 30 secondes.", "Faites fondre le beurre dans une poêle à feu moyen jusqu'à ce qu'il mousse légèrement.", "Versez les œufs battus, laissez prendre 1 minute sans remuer, puis parsemez le fromage râpé sur la moitié de l'omelette.", "Repliez l'omelette en deux à l'aide d'une spatule et laissez cuire encore 1 minute avant de servir aussitôt."] },

  { nom: "Pâtes ail et huile d'olive", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "Italie", image: img("pasta,garlic", 2),
    ingredients: [{ nom: "Pâtes", qty: 200, unite: "g" }, { nom: "Ail", qty: 3, unite: "gousse(s)" }, { nom: "Huile d'olive", qty: 4, unite: "c. à soupe" }, { nom: "Parmesan", qty: 30, unite: "g" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Faites bouillir un grand volume d'eau salée et cuisez les pâtes selon le temps indiqué sur le paquet.", "Pendant ce temps, émincez finement l'ail et faites-le dorer doucement dans l'huile d'olive à feu doux, sans le laisser brûler.", "Égouttez les pâtes en réservant un peu d'eau de cuisson, puis versez-les dans la poêle avec l'ail et l'huile.", "Mélangez bien, ajoutez un peu d'eau de cuisson si besoin pour lier, et servez avec le parmesan râpé."] },

  { nom: "Salade tomates concombre", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("tomato,cucumber,salad", 3),
    ingredients: [{ nom: "Tomate", qty: 3, unite: "" }, { nom: "Concombre", qty: 1, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }, { nom: "Vinaigre", qty: 1, unite: "c. à soupe" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Lavez et coupez les tomates en quartiers et le concombre en demi-rondelles.", "Émincez très finement l'oignon pour qu'il soit doux en bouche.", "Mélangez le tout dans un saladier, arrosez d'huile d'olive et de vinaigre, salez et mélangez délicatement avant de servir frais."] },

  { nom: "Riz sauté au jambon", dureeMin: 15, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("friedrice,ham", 4),
    ingredients: [{ nom: "Riz", qty: 300, unite: "g cuit" }, { nom: "Jambon", qty: 100, unite: "g" }, { nom: "Œufs", qty: 2, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Faites chauffer l'huile dans une grande poêle, faites-y revenir l'oignon émincé 2 minutes.", "Ajoutez le jambon coupé en dés et faites-le légèrement dorer.", "Poussez le tout sur le côté, cassez les œufs dans l'espace libre, brouillez-les puis mélangez à l'ensemble.", "Ajoutez le riz cuit refroidi, égrainez à la spatule et faites sauter 3-4 minutes à feu vif jusqu'à ce que tout soit bien chaud."] },

  { nom: "Croque-monsieur", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("croquemonsieur,sandwich", 5),
    ingredients: [{ nom: "Pain", qty: 4, unite: "tranche(s)" }, { nom: "Jambon", qty: 2, unite: "tranche(s)" }, { nom: "Fromage râpé", qty: 80, unite: "g" }, { nom: "Beurre", qty: 20, unite: "g" }],
    etapes: ["Beurrez légèrement l'extérieur des 4 tranches de pain.", "Garnissez deux tranches de jambon et de la moitié du fromage râpé, refermez avec les deux autres tranches.", "Faites cuire à la poêle à feu moyen 3-4 minutes de chaque côté, en ajoutant le reste de fromage sur le dessus en fin de cuisson, ou passez 8 minutes au four à 200°C."] },

  { nom: "Pâtes carbonara simplifiées", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Italie", image: img("carbonara,pasta", 6),
    ingredients: [{ nom: "Pâtes", qty: 200, unite: "g" }, { nom: "Lardons", qty: 100, unite: "g" }, { nom: "Œufs", qty: 2, unite: "" }, { nom: "Parmesan", qty: 40, unite: "g" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Cuisez les pâtes dans l'eau bouillante salée selon le temps indiqué.", "Pendant ce temps, faites revenir les lardons à sec dans une poêle jusqu'à ce qu'ils soient dorés.", "Dans un bol, battez les œufs avec le parmesan et une bonne dose de poivre.", "Égouttez les pâtes encore chaudes, versez-les hors du feu sur les lardons puis ajoutez le mélange œufs-parmesan en remuant vite pour obtenir une sauce crémeuse sans cuire les œufs en omelette."] },

  { nom: "Soupe de légumes", dureeMin: 30, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("vegetablesoup", 7),
    ingredients: [{ nom: "Carotte", qty: 3, unite: "" }, { nom: "Pomme de terre", qty: 2, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Épluchez et coupez les légumes en morceaux réguliers.", "Faites-les revenir 5 minutes dans un peu d'huile avec l'oignon et l'ail émincés.", "Couvrez d'eau à hauteur, salez, poivrez et laissez mijoter 25 minutes à couvert jusqu'à ce que les légumes soient tendres.", "Mixez si vous préférez une texture lisse, ou laissez tel quel pour une soupe rustique."] },

  { nom: "Pommes de terre sautées", dureeMin: 25, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("friedpotatoes", 8),
    ingredients: [{ nom: "Pomme de terre", qty: 5, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Épluchez et coupez les pommes de terre en dés de 1,5 cm.", "Faites chauffer l'huile dans une grande poêle, ajoutez les pommes de terre en une seule couche.", "Laissez dorer 8-10 minutes sans trop remuer, puis ajoutez l'oignon émincé et poursuivez 8 minutes en remuant régulièrement. Salez et poivrez en fin de cuisson."] },

  { nom: "Salade de thon", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("tunasalad", 9),
    ingredients: [{ nom: "Thon en boîte", qty: 1, unite: "boîte" }, { nom: "Tomate", qty: 2, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }, { nom: "Citron", qty: 0.5, unite: "" }],
    etapes: ["Égouttez soigneusement le thon et émiettez-le à la fourchette.", "Coupez les tomates en dés et émincez l'oignon finement.", "Mélangez le tout, arrosez d'huile d'olive et d'un filet de jus de citron avant de servir frais."] },

  { nom: "Poulet à la moutarde", dureeMin: 25, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("chickenmustard", 10),
    ingredients: [{ nom: "Poulet", qty: 2, unite: "blanc(s)" }, { nom: "Moutarde", qty: 2, unite: "c. à soupe" }, { nom: "Crème fraîche", qty: 100, unite: "g" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Coupez le poulet en morceaux et faites-le dorer 5 minutes de chaque côté dans une poêle huilée.", "Badigeonnez les morceaux de moutarde, salez et poivrez.", "Ajoutez la crème fraîche, mélangez, couvrez et laissez mijoter à feu doux 12-15 minutes jusqu'à ce que le poulet soit bien cuit."] },

  { nom: "Gratin de pommes de terre", dureeMin: 45, difficulte: "Avancé", categorie: "Salé", cuisine: "France", image: img("potatogratin", 11),
    ingredients: [{ nom: "Pomme de terre", qty: 6, unite: "" }, { nom: "Crème fraîche", qty: 200, unite: "g" }, { nom: "Fromage râpé", qty: 100, unite: "g" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Préchauffez le four à 180°C. Épluchez et coupez les pommes de terre en fines rondelles de 2-3 mm.", "Frottez un plat à gratin avec la gousse d'ail, disposez les pommes de terre en couches régulières, salez entre chaque couche.", "Versez la crème fraîche sur l'ensemble en l'étalant bien, couvrez de fromage râpé.", "Enfournez 40 à 45 minutes jusqu'à ce que le dessus soit doré et que les pommes de terre soient fondantes à la pointe du couteau."] },

  { nom: "Sandwich jambon-beurre amélioré", dureeMin: 5, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("hamsandwich", 12),
    ingredients: [{ nom: "Pain", qty: 1, unite: "baguette ou 4 tranches" }, { nom: "Jambon", qty: 3, unite: "tranche(s)" }, { nom: "Beurre", qty: 20, unite: "g" }, { nom: "Salade", qty: 2, unite: "feuille(s)" }, { nom: "Moutarde", qty: 1, unite: "c. à café" }],
    etapes: ["Coupez le pain en deux dans la longueur et tartinez de beurre puis d'un peu de moutarde.", "Garnissez de jambon et de feuilles de salade, refermez et dégustez aussitôt."] },

  { nom: "Riz au thon", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("tunarice", 13),
    ingredients: [{ nom: "Riz", qty: 300, unite: "g cuit" }, { nom: "Thon en boîte", qty: 1, unite: "boîte" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }, { nom: "Citron", qty: 0.5, unite: "" }],
    etapes: ["Faites revenir l'oignon émincé dans l'huile d'olive 3 minutes à feu moyen.", "Ajoutez le thon égoutté et émietté, mélangez 2 minutes.", "Incorporez le riz cuit, réchauffez en remuant et terminez avec un filet de jus de citron."] },

  { nom: "Champignons à l'ail persillade", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("mushrooms,garlic", 14),
    ingredients: [{ nom: "Champignon", qty: 300, unite: "g" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Beurre", qty: 25, unite: "g" }, { nom: "Persil", qty: null, unite: "" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Nettoyez les champignons et émincez-les.", "Faites fondre le beurre dans une poêle chaude, ajoutez les champignons en une couche et laissez-les dorer sans trop remuer 5-6 minutes pour évacuer l'eau.", "Ajoutez l'ail émincé, poursuivez 2 minutes, parsemez de persil ciselé, salez et poivrez."] },

  { nom: "Riz aux légumes", dureeMin: 25, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("vegetablerice", 15),
    ingredients: [{ nom: "Riz", qty: 300, unite: "g cuit" }, { nom: "Carotte", qty: 2, unite: "" }, { nom: "Courgette", qty: 1, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Coupez la carotte et la courgette en petits dés.", "Faites revenir l'oignon dans l'huile 2 minutes, ajoutez la carotte 5 minutes, puis la courgette 4 minutes de plus.", "Ajoutez le riz cuit, mélangez bien et laissez réchauffer 2-3 minutes."] },

  { nom: "Steak haché et pommes de terre", dureeMin: 25, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("steak,friedpotatoes", 16),
    ingredients: [{ nom: "Steak haché", qty: 2, unite: "" }, { nom: "Pomme de terre", qty: 4, unite: "" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Coupez les pommes de terre en dés et faites-les cuire dans l'huile chaude 15-18 minutes en remuant régulièrement, jusqu'à ce qu'elles soient dorées et tendres.", "Salez et poivrez les steaks hachés des deux côtés.", "Saisissez-les dans une poêle bien chaude 2 à 3 minutes par face selon la cuisson désirée, puis servez avec les pommes de terre."] },

  { nom: "Quiche sans pâte", dureeMin: 35, difficulte: "Avancé", categorie: "Salé", cuisine: "France", image: img("quiche", 17),
    ingredients: [{ nom: "Œufs", qty: 4, unite: "" }, { nom: "Lait", qty: 200, unite: "ml" }, { nom: "Fromage râpé", qty: 100, unite: "g" }, { nom: "Jambon", qty: 3, unite: "tranche(s)" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Préchauffez le four à 180°C et beurrez un plat à tarte.", "Battez les œufs avec le lait et le sel jusqu'à obtenir un mélange homogène.", "Ajoutez le jambon coupé en dés et le fromage râpé, mélangez et versez dans le plat.", "Enfournez 30 minutes, jusqu'à ce que la quiche soit dorée et prise au centre."] },

  { nom: "Pâtes tomate basilic", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Italie", image: img("tomatopasta,basil", 18),
    ingredients: [{ nom: "Pâtes", qty: 200, unite: "g" }, { nom: "Tomate", qty: 4, unite: "" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Basilic", qty: null, unite: "" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Faites cuire les pâtes dans l'eau bouillante salée.", "Pendant ce temps, faites revenir l'ail dans l'huile, ajoutez les tomates concassées et laissez mijoter 10 minutes en écrasant légèrement à la fourchette.", "Ajoutez le basilic ciselé, mélangez la sauce aux pâtes égouttées et servez aussitôt."] },

  { nom: "Salade César simplifiée", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("caesarsalad", 19),
    ingredients: [{ nom: "Salade", qty: 1, unite: "" }, { nom: "Poulet", qty: 1, unite: "blanc" }, { nom: "Parmesan", qty: 30, unite: "g" }, { nom: "Pain", qty: 2, unite: "tranche(s)" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Faites cuire le poulet à la poêle 6-7 minutes de chaque côté puis coupez-le en lanières.", "Coupez le pain en cubes et faites-le dorer dans un peu d'huile d'olive pour obtenir des croûtons.", "Mélangez la salade avec le poulet, les croûtons et le parmesan râpé, arrosez d'huile d'olive."] },

  { nom: "Poêlée de courgettes", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("zucchini", 20),
    ingredients: [{ nom: "Courgette", qty: 2, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Coupez les courgettes en rondelles et émincez l'oignon et l'ail.", "Faites revenir l'oignon et l'ail dans l'huile 2 minutes, ajoutez les courgettes.", "Cuisez 10 minutes à feu moyen en remuant régulièrement, salez en fin de cuisson."] },

  { nom: "Vinaigrette maison", dureeMin: 5, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("vinaigrette,saladdressing", 21),
    ingredients: [{ nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }, { nom: "Vinaigre", qty: 1, unite: "c. à soupe" }, { nom: "Moutarde", qty: 1, unite: "c. à café" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Mélangez la moutarde avec le vinaigre et le sel dans un bol.", "Ajoutez l'huile petit à petit en fouettant pour émulsionner.", "Poivrez et ajustez l'assaisonnement selon votre goût."] },

  { nom: "Tomates farcies au riz", dureeMin: 40, difficulte: "Avancé", categorie: "Salé", cuisine: "France", image: img("stuffedtomatoes", 22),
    ingredients: [{ nom: "Tomate", qty: 4, unite: "grosses" }, { nom: "Riz", qty: 150, unite: "g cuit" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Préchauffez le four à 180°C. Coupez le chapeau des tomates et évidez-les à la cuillère en réservant la chair.", "Mélangez la chair des tomates avec le riz cuit, l'oignon et l'ail hachés, et un filet d'huile.", "Farcissez les tomates, remettez le chapeau et enfournez 25 minutes."] },

  { nom: "Poêlée de petits pois et lardons", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("peas,bacon", 23),
    ingredients: [{ nom: "Petits pois", qty: 300, unite: "g surgelés" }, { nom: "Lardons", qty: 80, unite: "g" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Beurre", qty: 15, unite: "g" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Faites revenir l'oignon émincé et les lardons dans le beurre 4 minutes.", "Ajoutez les petits pois surgelés directement, couvrez et laissez cuire 10 minutes à feu doux en remuant de temps en temps.", "Poivrez et servez chaud."] },

  { nom: "Poisson pané et petits pois", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("fishsticks,peas", 24),
    ingredients: [{ nom: "Poisson pané", qty: 4, unite: "" }, { nom: "Petits pois", qty: 300, unite: "g surgelés" }, { nom: "Beurre", qty: 10, unite: "g" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Faites cuire le poisson pané selon les indications du paquet, au four ou à la poêle.", "Pendant ce temps, faites cuire les petits pois 8 minutes dans l'eau bouillante salée, égouttez et ajoutez le beurre.", "Servez le poisson accompagné des petits pois."] },

  { nom: "Curry de légumes surgelés", dureeMin: 25, difficulte: "Moyen", categorie: "Salé", cuisine: "Inde", image: img("vegetablecurry", 25),
    ingredients: [{ nom: "Petits pois", qty: 200, unite: "g surgelés" }, { nom: "Épinards surgelés", qty: 200, unite: "g" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Curry", qty: 1, unite: "c. à café" }, { nom: "Riz", qty: 300, unite: "g cuit" }],
    etapes: ["Faites revenir l'oignon et l'ail émincés dans un peu d'huile 3 minutes, ajoutez le curry en poudre et mélangez 30 secondes pour le torréfier.", "Ajoutez les petits pois et les épinards encore surgelés, couvrez et laissez mijoter 15 minutes à feu doux.", "Servez bien chaud accompagné du riz cuit."] },

  { nom: "Crevettes à l'ail persillade", dureeMin: 15, difficulte: "Moyen", categorie: "Salé", cuisine: "France", image: img("garlicshrimp", 26),
    ingredients: [{ nom: "Crevettes surgelées", qty: 300, unite: "g" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Persil", qty: null, unite: "" }, { nom: "Beurre", qty: 20, unite: "g" }, { nom: "Citron", qty: 0.5, unite: "" }],
    etapes: ["Laissez décongeler les crevettes puis épongez-les bien.", "Faites fondre le beurre dans une poêle chaude, ajoutez les crevettes et faites-les sauter 3-4 minutes jusqu'à ce qu'elles soient roses.", "Ajoutez l'ail émincé et le persil ciselé en fin de cuisson, arrosez d'un filet de citron."] },

  { nom: "Épinards à la crème", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("creamedspinach", 27),
    ingredients: [{ nom: "Épinards surgelés", qty: 300, unite: "g" }, { nom: "Crème fraîche", qty: 100, unite: "g" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Faites chauffer les épinards surgelés à la poêle à feu moyen jusqu'à ce que toute l'eau soit évaporée.", "Ajoutez l'ail émincé, mélangez 1 minute.", "Incorporez la crème fraîche, salez, poivrez et laissez mijoter 2-3 minutes."] },

  { nom: "Frites maison et steak", dureeMin: 20, difficulte: "Facile", categorie: "Salé", cuisine: "France", image: img("steak,fries", 28),
    ingredients: [{ nom: "Frites surgelées", qty: 350, unite: "g" }, { nom: "Steak haché", qty: 2, unite: "" }, { nom: "Sel", qty: null, unite: "" }, { nom: "Poivre", qty: null, unite: "" }],
    etapes: ["Faites cuire les frites surgelées au four selon les indications du paquet, généralement 20-25 minutes à 200°C.", "Quelques minutes avant la fin, salez et poivrez les steaks hachés et saisissez-les 2-3 minutes de chaque côté dans une poêle bien chaude.", "Servez ensemble dès que les frites sont dorées et croustillantes."] },

  { nom: "Pain perdu", dureeMin: 15, difficulte: "Facile", categorie: "Sucré", cuisine: "France", image: img("frenchtoast", 29),
    ingredients: [{ nom: "Pain", qty: 4, unite: "tranche(s) rassises" }, { nom: "Œufs", qty: 2, unite: "" }, { nom: "Lait", qty: 200, unite: "ml" }, { nom: "Sucre", qty: 2, unite: "c. à soupe" }, { nom: "Beurre", qty: 20, unite: "g" }],
    etapes: ["Battez les œufs avec le lait et le sucre dans une assiette creuse.", "Trempez chaque tranche de pain des deux côtés jusqu'à ce qu'elle soit bien imbibée.", "Faites dorer les tranches dans le beurre chaud 2-3 minutes de chaque côté jusqu'à obtenir une belle couleur dorée."] },

  { nom: "Crêpes maison", dureeMin: 30, difficulte: "Moyen", categorie: "Sucré", cuisine: "France", image: img("crepes", 30),
    ingredients: [{ nom: "Farine", qty: 250, unite: "g" }, { nom: "Œufs", qty: 3, unite: "" }, { nom: "Lait", qty: 500, unite: "ml" }, { nom: "Sucre", qty: 2, unite: "c. à soupe" }, { nom: "Beurre", qty: 20, unite: "g fondu" }],
    etapes: ["Mélangez la farine et le sucre dans un saladier, creusez un puits au centre.", "Cassez les œufs dedans et versez le lait petit à petit en fouettant pour éviter les grumeaux, jusqu'à obtenir une pâte lisse.", "Ajoutez le beurre fondu et laissez reposer la pâte 30 minutes si possible.", "Faites cuire les crêpes dans une poêle chaude légèrement beurrée, 1-2 minutes de chaque côté."] },

  { nom: "Mug cake au chocolat", dureeMin: 5, difficulte: "Facile", categorie: "Sucré", cuisine: "France", image: img("mugcake,chocolate", 31),
    ingredients: [{ nom: "Farine", qty: 4, unite: "c. à soupe" }, { nom: "Sucre", qty: 3, unite: "c. à soupe" }, { nom: "Œufs", qty: 1, unite: "" }, { nom: "Lait", qty: 3, unite: "c. à soupe" }, { nom: "Chocolat", qty: 30, unite: "g" }, { nom: "Levure chimique", qty: 0.5, unite: "c. à café" }],
    etapes: ["Faites fondre le chocolat au micro-ondes ou au bain-marie.", "Dans un mug, mélangez la farine, le sucre et la levure chimique.", "Ajoutez l'œuf, le lait et le chocolat fondu, mélangez jusqu'à obtenir une pâte homogène.", "Faites cuire 1 minute 30 à 2 minutes au micro-ondes à pleine puissance, jusqu'à ce que le gâteau soit gonflé mais encore moelleux au centre."] },

  { nom: "Compote de pommes maison", dureeMin: 25, difficulte: "Facile", categorie: "Sucré", cuisine: "France", image: img("applesauce", 32),
    ingredients: [{ nom: "Pomme", qty: 5, unite: "" }, { nom: "Sucre", qty: 2, unite: "c. à soupe" }, { nom: "Vanille", qty: 1, unite: "sachet de sucre vanillé" }],
    etapes: ["Épluchez et coupez les pommes en morceaux.", "Placez-les dans une casserole avec le sucre, la vanille et un fond d'eau (2-3 cuillères à soupe).", "Laissez cuire à couvert à feu doux 15-20 minutes en remuant de temps en temps, jusqu'à ce que les pommes soient fondantes.", "Écrasez à la fourchette ou mixez selon la texture souhaitée."] },

  { nom: "Bananes caramélisées", dureeMin: 10, difficulte: "Facile", categorie: "Sucré", cuisine: "France", image: img("caramelizedbanana", 33),
    ingredients: [{ nom: "Banane", qty: 4, unite: "" }, { nom: "Beurre", qty: 20, unite: "g" }, { nom: "Sucre", qty: 2, unite: "c. à soupe" }, { nom: "Citron", qty: 0.5, unite: "" }],
    etapes: ["Coupez les bananes en deux dans la longueur.", "Faites fondre le beurre dans une poêle avec le sucre jusqu'à ce qu'il caramélise légèrement.", "Déposez les bananes côté coupé dans la poêle, faites cuire 2-3 minutes de chaque côté jusqu'à ce qu'elles soient dorées, arrosez d'un filet de citron."] },

  { nom: "Yaourt miel et fruits", dureeMin: 5, difficulte: "Facile", categorie: "Sucré", cuisine: "France", image: img("yogurt,honey", 34),
    ingredients: [{ nom: "Yaourt", qty: 2, unite: "" }, { nom: "Miel", qty: 2, unite: "c. à soupe" }, { nom: "Banane", qty: 1, unite: "" }],
    etapes: ["Versez le yaourt dans un bol ou un verre.", "Coupez la banane en rondelles et disposez-la sur le yaourt.", "Arrosez généreusement de miel avant de déguster."] },

  { nom: "Riz cantonais maison", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Chine", image: img("friedrice,chinese", 35),
    ingredients: [{ nom: "Riz", qty: 300, unite: "g cuit et froid" }, { nom: "Œufs", qty: 2, unite: "" }, { nom: "Petits pois", qty: 100, unite: "g" }, { nom: "Carotte", qty: 1, unite: "" }, { nom: "Jambon", qty: 80, unite: "g" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Coupez la carotte et le jambon en petits dés.", "Faites chauffer l'huile à feu vif, faites revenir la carotte et les petits pois 3 minutes.", "Poussez les légumes sur le côté, cassez les œufs, brouillez-les rapidement puis mélangez avec le jambon.", "Ajoutez le riz froid, égrainez à la spatule et faites sauter 4-5 minutes à feu vif jusqu'à ce que tout soit bien chaud."] },

  { nom: "Nouilles sautées au poulet", dureeMin: 25, difficulte: "Moyen", categorie: "Salé", cuisine: "Chine", image: img("friednoodles,chicken", 36),
    ingredients: [{ nom: "Pâtes", qty: 200, unite: "g type nouilles" }, { nom: "Poulet", qty: 2, unite: "blanc(s)" }, { nom: "Carotte", qty: 1, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Faites cuire les nouilles (ou pâtes) selon le temps indiqué, égouttez et réservez.", "Coupez le poulet en lanières et la carotte en fins bâtonnets.", "Faites chauffer l'huile à feu vif, saisissez le poulet 4-5 minutes jusqu'à ce qu'il soit doré, ajoutez l'oignon et la carotte, faites sauter 3 minutes.", "Ajoutez les nouilles, mélangez bien à feu vif 2-3 minutes."] },

  { nom: "Tacos simples", dureeMin: 20, difficulte: "Facile", categorie: "Salé", cuisine: "Mexique", image: img("tacos,mexican", 37),
    ingredients: [{ nom: "Tortillas de blé", qty: 4, unite: "" }, { nom: "Steak haché", qty: 2, unite: "" }, { nom: "Tomate", qty: 1, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Salade", qty: 2, unite: "feuille(s)" }],
    etapes: ["Faites cuire le steak haché émietté à la poêle 5-6 minutes à feu moyen-vif jusqu'à ce qu'il soit bien doré.", "Coupez la tomate en dés, émincez l'oignon et ciselez la salade.", "Réchauffez les tortillas quelques secondes de chaque côté à la poêle sèche.", "Garnissez chaque tortilla de viande, tomate, oignon et salade, repliez et dégustez aussitôt."] },

  { nom: "Quesadillas au poulet", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "Mexique", image: img("quesadilla", 38),
    ingredients: [{ nom: "Tortillas de blé", qty: 4, unite: "" }, { nom: "Poulet", qty: 1, unite: "blanc cuit" }, { nom: "Fromage râpé", qty: 100, unite: "g" }, { nom: "Oignon", qty: 0.5, unite: "" }],
    etapes: ["Émiettez le poulet cuit et émincez finement l'oignon.", "Répartissez le fromage râpé, le poulet et l'oignon sur une moitié de chaque tortilla, repliez en deux.", "Faites dorer à sec dans une poêle chaude 2-3 minutes de chaque côté, jusqu'à ce que le fromage soit fondu."] },

  { nom: "Guacamole simplifié", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "Mexique", image: img("guacamole", 39),
    ingredients: [{ nom: "Avocat", qty: 2, unite: "" }, { nom: "Tomate", qty: 1, unite: "" }, { nom: "Oignon", qty: 0.3, unite: "" }, { nom: "Citron", qty: 0.5, unite: "" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Écrasez la chair des avocats à la fourchette dans un bol.", "Ajoutez la tomate coupée en petits dés et l'oignon finement émincé.", "Arrosez de jus de citron, salez et mélangez. Servez immédiatement pour garder une belle couleur."] },

  { nom: "Tajine de poulet simplifié", dureeMin: 50, difficulte: "Avancé", categorie: "Salé", cuisine: "Maroc", image: img("tajine,morocco", 40),
    ingredients: [{ nom: "Poulet", qty: 4, unite: "morceaux" }, { nom: "Carotte", qty: 2, unite: "" }, { nom: "Pomme de terre", qty: 2, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Cumin", qty: 1, unite: "c. à café" }, { nom: "Paprika", qty: 1, unite: "c. à café" }, { nom: "Citron", qty: 0.5, unite: "" }],
    etapes: ["Faites dorer les morceaux de poulet dans un peu d'huile 5 minutes de chaque côté, puis réservez.", "Dans la même cocotte, faites revenir l'oignon émincé avec le cumin et le paprika 2 minutes.", "Ajoutez les carottes et pommes de terre en gros morceaux, remettez le poulet, couvrez d'eau à mi-hauteur.", "Laissez mijoter à couvert 35-40 minutes à feu doux jusqu'à ce que tout soit tendre, terminez avec un filet de citron."] },

  { nom: "Couscous aux légumes", dureeMin: 40, difficulte: "Moyen", categorie: "Salé", cuisine: "Maroc", image: img("couscous,vegetables", 41),
    ingredients: [{ nom: "Semoule de couscous", qty: 250, unite: "g" }, { nom: "Carotte", qty: 2, unite: "" }, { nom: "Courgette", qty: 1, unite: "" }, { nom: "Pomme de terre", qty: 2, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Cumin", qty: 1, unite: "c. à café" }],
    etapes: ["Faites revenir l'oignon avec le cumin, ajoutez les légumes coupés en morceaux et couvrez d'eau. Laissez mijoter 25 minutes.", "Pendant ce temps, versez la semoule dans un saladier, couvrez-la d'eau chaude à niveau, couvrez et laissez gonfler 5 minutes.", "Égrainez la semoule à la fourchette avec un filet d'huile d'olive, servez avec les légumes et leur bouillon."] },

  { nom: "Carottes épicées à la marocaine", dureeMin: 20, difficulte: "Facile", categorie: "Salé", cuisine: "Maroc", image: img("moroccancarrots", 42),
    ingredients: [{ nom: "Carotte", qty: 5, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Cumin", qty: 1, unite: "c. à café" }, { nom: "Citron", qty: 0.5, unite: "" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Épluchez les carottes et faites-les cuire 12-15 minutes à l'eau bouillante jusqu'à tendreté, puis coupez-les en rondelles.", "Mélangez l'ail écrasé, le cumin, le jus de citron et l'huile d'olive dans un bol.", "Versez cette vinaigrette épicée sur les carottes encore tièdes et mélangez bien. Servez tiède ou froid."] },

  { nom: "Risotto aux champignons", dureeMin: 30, difficulte: "Avancé", categorie: "Salé", cuisine: "Italie", image: img("risotto,mushroom", 43),
    ingredients: [{ nom: "Riz", qty: 300, unite: "g type rond" }, { nom: "Champignon", qty: 250, unite: "g" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Parmesan", qty: 40, unite: "g" }, { nom: "Beurre", qty: 20, unite: "g" }],
    etapes: ["Faites revenir l'oignon émincé dans le beurre 2 minutes, ajoutez le riz et nacrez-le 2 minutes en remuant.", "Ajoutez les champignons émincés, poursuivez 2 minutes.", "Versez de l'eau chaude louche par louche, en remuant régulièrement et en attendant que le liquide soit absorbé avant d'en rajouter, pendant environ 18 minutes.", "Hors du feu, incorporez le parmesan râpé pour obtenir un risotto crémeux."] },

  { nom: "Tortilla espagnole", dureeMin: 30, difficulte: "Moyen", categorie: "Salé", cuisine: "Espagne", image: img("spanishtortilla", 44),
    ingredients: [{ nom: "Œufs", qty: 5, unite: "" }, { nom: "Pomme de terre", qty: 4, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Huile d'olive", qty: 4, unite: "c. à soupe" }],
    etapes: ["Épluchez et coupez les pommes de terre et l'oignon en fines tranches.", "Faites-les cuire doucement dans l'huile d'olive 15-18 minutes à feu doux jusqu'à ce qu'ils soient fondants sans être colorés.", "Égouttez et mélangez aux œufs battus salés.", "Reversez dans la poêle avec un peu d'huile, cuisez 4-5 minutes, puis retournez la tortilla à l'aide d'une assiette pour cuire l'autre face 4 minutes."] },

  { nom: "Riz façon poke bowl", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "Japon", image: img("pokebowl,rice", 45),
    ingredients: [{ nom: "Riz", qty: 250, unite: "g cuit" }, { nom: "Thon en boîte", qty: 1, unite: "boîte" }, { nom: "Concombre", qty: 0.5, unite: "" }, { nom: "Vinaigre", qty: 1, unite: "c. à soupe" }, { nom: "Avocat", qty: 1, unite: "" }],
    etapes: ["Assaisonnez le riz cuit encore tiède avec le vinaigre, mélangez délicatement et laissez refroidir.", "Coupez le concombre et l'avocat en petits dés, émiettez le thon égoutté.", "Répartissez le riz dans un bol, disposez le thon, le concombre et l'avocat par-dessus en petits tas."] },

  { nom: "Poulet sauce soja et gingembre", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Chine", image: img("chicken,soysauce", 46),
    ingredients: [{ nom: "Poulet", qty: 2, unite: "blanc(s)" }, { nom: "Sauce soja", qty: 3, unite: "c. à soupe" }, { nom: "Gingembre", qty: 1, unite: "morceau" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Coupez le poulet en morceaux, émincez finement l'ail et le gingembre.", "Faites chauffer l'huile à feu vif, saisissez le poulet 5-6 minutes jusqu'à ce qu'il soit bien doré.", "Ajoutez l'ail, le gingembre et la sauce soja, laissez mijoter 5 minutes à feu doux jusqu'à ce que la sauce nappe légèrement le poulet."] },

  { nom: "Bœuf sauté aux poivrons façon chinoise", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Chine", image: img("beef,peppers,stirfry", 47),
    ingredients: [{ nom: "Steak haché", qty: 2, unite: "" }, { nom: "Poivron", qty: 2, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Sauce soja", qty: 2, unite: "c. à soupe" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Émincez les poivrons et l'oignon en fines lanières.", "Faites chauffer l'huile à feu vif, saisissez le steak haché émietté 3-4 minutes.", "Ajoutez les poivrons et l'oignon, faites sauter 5 minutes à feu vif, arrosez de sauce soja et mélangez 1 minute de plus."] },

  { nom: "Chili con carne simplifié", dureeMin: 30, difficulte: "Moyen", categorie: "Salé", cuisine: "Mexique", image: img("chili,beans", 48),
    ingredients: [{ nom: "Steak haché", qty: 2, unite: "" }, { nom: "Haricots rouges", qty: 400, unite: "g (boîte)" }, { nom: "Tomate", qty: 3, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Piment", qty: 0.5, unite: "c. à café" }, { nom: "Cumin", qty: 1, unite: "c. à café" }],
    etapes: ["Faites revenir l'oignon émincé puis ajoutez le steak haché émietté, faites-le dorer 5 minutes.", "Ajoutez les tomates coupées en dés, le cumin et le piment, mélangez bien.", "Incorporez les haricots rouges égouttés, couvrez et laissez mijoter 20 minutes à feu doux en remuant de temps en temps."] },

  { nom: "Riz mexicain", dureeMin: 25, difficulte: "Facile", categorie: "Salé", cuisine: "Mexique", image: img("mexicanrice", 49),
    ingredients: [{ nom: "Riz", qty: 200, unite: "g cru" }, { nom: "Tomate", qty: 2, unite: "" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Poivron", qty: 1, unite: "" }, { nom: "Cumin", qty: 1, unite: "c. à café" }],
    etapes: ["Faites revenir le riz cru dans un peu d'huile 2 minutes jusqu'à ce qu'il devienne translucide.", "Ajoutez l'oignon et le poivron émincés ainsi que le cumin, poursuivez 2 minutes.", "Ajoutez les tomates mixées et de l'eau à hauteur, couvrez et laissez cuire 18-20 minutes à feu doux jusqu'à absorption complète du liquide."] },

  { nom: "Harira simplifiée", dureeMin: 35, difficulte: "Moyen", categorie: "Salé", cuisine: "Maroc", image: img("harira,moroccansoup", 50),
    ingredients: [{ nom: "Tomate", qty: 3, unite: "" }, { nom: "Oignon", qty: 1, unite: "" }, { nom: "Riz", qty: 100, unite: "g cru" }, { nom: "Cumin", qty: 1, unite: "c. à café" }, { nom: "Persil", qty: null, unite: "" }],
    etapes: ["Faites revenir l'oignon émincé avec le cumin 2 minutes dans un peu d'huile.", "Ajoutez les tomates concassées et un litre d'eau, portez à ébullition.", "Ajoutez le riz, laissez mijoter 20 minutes jusqu'à ce qu'il soit cuit, parsemez de persil ciselé avant de servir."] },

  { nom: "Poivrons marocains épicés", dureeMin: 20, difficulte: "Facile", categorie: "Salé", cuisine: "Maroc", image: img("moroccanpeppers", 51),
    ingredients: [{ nom: "Poivron", qty: 3, unite: "" }, { nom: "Ail", qty: 2, unite: "gousse(s)" }, { nom: "Cumin", qty: 1, unite: "c. à café" }, { nom: "Paprika", qty: 1, unite: "c. à café" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Coupez les poivrons en lanières.", "Faites-les revenir dans l'huile avec l'ail émincé, le cumin et le paprika pendant 12-15 minutes à feu moyen jusqu'à ce qu'ils soient fondants.", "Salez et servez tiède ou froid en accompagnement."] },

  { nom: "Bruschetta tomate basilic", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "Italie", image: img("bruschetta", 52),
    ingredients: [{ nom: "Pain", qty: 4, unite: "tranche(s) de baguette" }, { nom: "Tomate", qty: 3, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Basilic", qty: null, unite: "" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Faites griller les tranches de pain au four ou au grille-pain jusqu'à ce qu'elles soient dorées.", "Frottez-les avec la gousse d'ail encore chaudes.", "Coupez les tomates en petits dés, mélangez avec le basilic ciselé et l'huile d'olive, répartissez sur le pain grillé."] },

  { nom: "Escalope de poulet à la milanaise simplifiée", dureeMin: 25, difficulte: "Moyen", categorie: "Salé", cuisine: "Italie", image: img("chickenmilanese", 53),
    ingredients: [{ nom: "Poulet", qty: 2, unite: "blanc(s) aplatis" }, { nom: "Farine", qty: 50, unite: "g" }, { nom: "Œufs", qty: 2, unite: "" }, { nom: "Parmesan", qty: 40, unite: "g" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Aplatissez les blancs de poulet finement entre deux feuilles de papier cuisson.", "Passez-les dans la farine, puis dans les œufs battus mélangés au parmesan râpé.", "Faites-les dorer 3-4 minutes de chaque côté dans l'huile chaude jusqu'à ce qu'ils soient bien croustillants."] },

  { nom: "Patatas bravas simplifiées", dureeMin: 30, difficulte: "Moyen", categorie: "Salé", cuisine: "Espagne", image: img("patatasbravas", 54),
    ingredients: [{ nom: "Pomme de terre", qty: 5, unite: "" }, { nom: "Tomate", qty: 2, unite: "" }, { nom: "Paprika", qty: 1, unite: "c. à café" }, { nom: "Piment", qty: 0.3, unite: "c. à café" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Coupez les pommes de terre en gros cubes et faites-les dorer 20 minutes dans l'huile chaude en remuant régulièrement.", "Pendant ce temps, mixez les tomates avec le paprika et le piment pour obtenir une sauce.", "Faites chauffer la sauce quelques minutes et nappez-en les pommes de terre bien dorées."] },

  { nom: "Gaspacho andalou", dureeMin: 15, difficulte: "Facile", categorie: "Salé", cuisine: "Espagne", image: img("gazpacho", 55),
    ingredients: [{ nom: "Tomate", qty: 5, unite: "" }, { nom: "Concombre", qty: 1, unite: "" }, { nom: "Poivron", qty: 1, unite: "" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }, { nom: "Huile d'olive", qty: 3, unite: "c. à soupe" }],
    etapes: ["Coupez grossièrement les tomates, le concombre et le poivron.", "Mixez le tout avec l'ail et l'huile d'olive jusqu'à obtenir une texture bien lisse.", "Salez, réfrigérez au moins 1 heure et servez bien frais."] },

  { nom: "Poulet tikka masala simplifié", dureeMin: 30, difficulte: "Moyen", categorie: "Salé", cuisine: "Inde", image: img("tikkamasala", 56),
    ingredients: [{ nom: "Poulet", qty: 2, unite: "blanc(s)" }, { nom: "Yaourt", qty: 2, unite: "" }, { nom: "Tomate", qty: 3, unite: "" }, { nom: "Curry", qty: 1, unite: "c. à soupe" }, { nom: "Crème fraîche", qty: 100, unite: "g" }],
    etapes: ["Coupez le poulet en morceaux et faites-le mariner quelques minutes dans le yaourt et la moitié du curry.", "Faites-le dorer 6-7 minutes dans une poêle chaude.", "Ajoutez les tomates concassées et le reste du curry, laissez mijoter 12 minutes, puis incorporez la crème fraîche en fin de cuisson."] },

  { nom: "Riz basmati épicé", dureeMin: 20, difficulte: "Facile", categorie: "Salé", cuisine: "Inde", image: img("basmatirice,spices", 57),
    ingredients: [{ nom: "Riz", qty: 250, unite: "g cru" }, { nom: "Oignon", qty: 0.5, unite: "" }, { nom: "Cumin", qty: 1, unite: "c. à café" }, { nom: "Huile d'olive", qty: 2, unite: "c. à soupe" }],
    etapes: ["Faites revenir l'oignon émincé et le cumin dans l'huile 2 minutes.", "Ajoutez le riz cru, mélangez 1 minute pour bien l'enrober.", "Couvrez de deux volumes d'eau pour un volume de riz, couvrez et laissez cuire 12-15 minutes à feu doux jusqu'à absorption complète."] },

  { nom: "Poulet teriyaki", dureeMin: 20, difficulte: "Moyen", categorie: "Salé", cuisine: "Japon", image: img("teriyakichicken", 58),
    ingredients: [{ nom: "Poulet", qty: 2, unite: "blanc(s)" }, { nom: "Sauce soja", qty: 3, unite: "c. à soupe" }, { nom: "Sucre", qty: 1, unite: "c. à soupe" }, { nom: "Ail", qty: 1, unite: "gousse(s)" }],
    etapes: ["Coupez le poulet en morceaux et faites-le dorer 5-6 minutes dans une poêle huilée.", "Mélangez la sauce soja, le sucre et l'ail écrasé dans un bol.", "Versez ce mélange sur le poulet, laissez réduire 3-4 minutes à feu vif jusqu'à ce que la sauce devienne sirupeuse et nappe bien la viande."] },

  { nom: "Salade de concombre à la japonaise", dureeMin: 10, difficulte: "Facile", categorie: "Salé", cuisine: "Japon", image: img("cucumbersalad,japanese", 59),
    ingredients: [{ nom: "Concombre", qty: 2, unite: "" }, { nom: "Vinaigre", qty: 2, unite: "c. à soupe" }, { nom: "Sucre", qty: 1, unite: "c. à café" }, { nom: "Sel", qty: null, unite: "" }],
    etapes: ["Coupez le concombre en très fines rondelles.", "Saupoudrez-le d'un peu de sel, laissez dégorger 5 minutes puis essorez légèrement.", "Mélangez avec le vinaigre et le sucre, laissez mariner 10 minutes au frais avant de servir."] },
];

export default RECIPES;
