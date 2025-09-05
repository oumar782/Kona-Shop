export const cuisine = [
    // Mobilier
    {
      id: 'CU-MO-001',
      nom: "Table de salle à manger extensible en chêne massif",
      descriptionCourte: "Table extensible 6/10 personnes chêne massif",
      descriptionLongue: "Superbe table de salle à manger extensible en chêne massif. Passe de 160 cm (6 personnes) à 220 cm (10 personnes) avec rallonge centrale intégrée. Design scandinave aux lignes épurées avec pieds en X caractéristiques. Finition huile naturelle qui protège le bois tout en laissant apparaître ses veines. Robuste et intemporelle.",
      prix: 1299,
      prixPromo: 1099,
      notation: 4.8,
      avis: 187,
      images: [
        "/decoration/cuisine/table-chene-1.jpg",
        "/decoration/cuisine/table-chene-2.jpg"
      ],
      marque: "Scandi Table",
      categorie: "Cuisine",
      sousCategorie: "Mobilier",
      caracteristiques: [
        {nom: "Dimensions", valeur: "160-220x95x75 cm"},
        {nom: "Poids", valeur: "65 kg"},
        {nom: "Matériau", valeur: "Chêne massif"},
        {nom: "Capacité", valeur: "6 à 10 personnes"},
        {nom: "Style", valeur: "Scandinave"}
      ],
      materiaux: "Chêne massif",
      dimensions: "160-220x95x75 cm",
      entretien: "Nettoyage avec chiffon humide, huilage annuel recommandé",
      couleurs: "Chêne naturel",
      garantie: "5 ans",
      stock: 5,
      bestseller: true
    },
  
    // Rangements
    {
      id: 'CU-RA-001',
      nom: "Buffet de cuisine vintage avec portes shaker",
      descriptionCourte: "Buffet 3 portes et 2 tiroirs style campagne",
      descriptionLongue: "Magnifique buffet de cuisine style campagne avec portes shaker et poignées en céramique. Trois portes et deux tiroirs offrant un ample rangement pour vaisselle et ustensiles. Structure en pin massif, finition peinture laquée vert sage. Pieds tournés caractéristiques. Apporte charme et fonctionnalité à votre cuisine.",
      prix: 799,
      notation: 4.7,
      avis: 134,
      images: [
        "/decoration/cuisine/buffet-vert-1.jpg"
      ],
      marque: "Country Living",
      categorie: "Cuisine",
      sousCategorie: "Rangements",
      caracteristiques: [
        {nom: "Dimensions", valeur: "120x45x85 cm"},
        {nom: "Matériau", valeur: "Pin massif"},
        {nom: "Finition", valeur: "Peinture laquée vert sage"},
        {nom: "Poignées", valeur: "Céramique blanche"},
        {nom: "Style", valeur: "Campagne moderne"}
      ],
      materiaux: "Pin massif, céramique",
      dimensions: "120x45x85 cm",
      entretien: "Nettoyage avec chiffon humide, éviter produits abrasifs",
      couleurs: "Vert sage",
      garantie: "3 ans",
      stock: 7
    },
  
    // Éclairage
    {
      id: 'CU-EC-001',
      nom: "Suspension industrielle 3 spots réglables",
      descriptionCourte: "Suspension cuisine noire avec spots orientables",
      descriptionLongue: "Suspension industrielle moderne avec trois spots réglables indépendamment. Structure en métal noir, bras en tube métallique et abat-jour en acier. Parfaite pour éclairer un plan de travail ou une table de cuisine. Hauteur réglable. Ampoules E27 incluses (LED 5W, 2700K). Style industriel qui s'intègre parfaitement dans une cuisine contemporaine.",
      prix: 159,
      notation: 4.6,
      avis: 98,
      images: [
        "/decoration/cuisine/suspension-industrielle-1.jpg"
      ],
      marque: "Urban Light",
      categorie: "Cuisine",
      sousCategorie: "Éclairage",
      caracteristiques: [
        {nom: "Dimensions", valeur: "60x60x120-150 cm (réglable)"},
        {nom: "Matériaux", valeur: "Métal, acier"},
        {nom: "Spots", valeur: "3 orientables indépendamment"},
        {nom: "Ampoules", valeur: "E27 LED 5W 2700K incluses"},
        {nom: "Style", valeur: "Industriel"}
      ],
      materiaux: "Métal, acier",
      dimensions: "60x60x120-150 cm (réglable)",
      entretien: "Dépoussiérage avec chiffon microfibre",
      couleurs: "Noir mat",
      garantie: "2 ans",
      stock: 11
    },
  
    // Décoration murale
    {
      id: 'CU-DM-001',
      nom: "Set d'étagères murales cuisine en bambou",
      descriptionCourte: "3 étagères murales bambou pour épices et plantes",
      descriptionLongue: "Set de trois étagères murales en bambou naturel pour cuisine. Parfaites pour ranger épices, petites plantes ou ustensiles. Design minimaliste avec supports métalliques noirs. Montage facile sur tous types de murs. Bambou durable et résistant à l'humidité. Apporte une touche naturelle et organisée à votre cuisine.",
      prix: 69,
      prixPromo: 59,
      notation: 4.5,
      avis: 123,
      images: [
        "/decoration/cuisine/etagères-bambou-1.jpg"
      ],
      marque: "Natural Kitchen",
      categorie: "Cuisine",
      sousCategorie: "Décoration murale",
      caracteristiques: [
        {nom: "Dimensions", valeur: "3x (40x15 cm)"},
        {nom: "Matériau", valeur: "Bambou naturel"},
        {nom: "Supports", valeur: "Métal noir"},
        {nom: "Charge max", valeur: "5 kg par étagère"},
        {nom: "Montage", valeur: "Vis et chevilles incluses"}
      ],
      materiaux: "Bambou, métal",
      dimensions: "40x15 cm chaque étagère",
      entretien: "Nettoyage avec chiffon humide",
      couleurs: "Bambou naturel, métal noir",
      garantie: "2 ans",
      stock: 16
    },
  
    // Arts de la table
    {
      id: 'CU-AT-001',
      nom: "Service de vaisselle complète 24 pièces grès émaillé",
      descriptionCourte: "Service 24 pièces grès stonewash bleu",
      descriptionLongue: "Magnifique service de vaisselle complète en grès émaillé 24 pièces. Finition stonewash bleu avec effet dégradé unique. Comprend 6 assiettes plates, 6 assiettes creuses, 6 bols et 6 mugs. Grès résistant au lave-vaisselle, micro-ondes et four. Design moderne et intemporel qui égayera votre table.",
      prix: 199,
      notation: 4.8,
      avis: 167,
      images: [
        "/decoration/cuisine/vaisselle-bleu-1.jpg",
        "/decoration/cuisine/vaisselle-bleu-2.jpg"
      ],
      marque: "Table Culture",
      categorie: "Cuisine",
      sousCategorie: "Arts de la table",
      caracteristiques: [
        {nom: "Nombre de pièces", valeur: "24"},
        {nom: "Matériau", valeur: "Grès émaillé"},
        {nom: "Contenu", valeur: "6 assiettes plates, 6 creuses, 6 bols, 6 mugs"},
        {nom: "Compatibilité", valeur: "Lave-vaisselle, micro-ondes, four"},
        {nom: "Style", valeur: "Moderne stonewash"}
      ],
      materiaux: "Grès émaillé",
      dimensions: "Assiette plate: Ø26 cm, Bol: Ø15 cm",
      entretien: "Lave-vaisselle safe",
      couleurs: "Bleu stonewash dégradé",
      garantie: "2 ans",
      stock: 14,
      nouveaute: true
    },
  
    // Accessoires déco
    {
      id: 'CU-AD-001',
      nom: "Set de bocaux de conservation en verre avec couvercles bois",
      descriptionCourte: "6 bocaux verre conservation alimentaire",
      descriptionLongue: "Set de 6 bocaux de conservation en verre épais avec couvercles en bambou et joint silicone. Parfaits pour stocker pâtes, riz, café, épices ou farine. Étanchéité parfaite pour conserver la fraîcheur des aliments. Design épuré qui permet de voir le contenu. Différentes tailles pour s'adapter à tous les besoins.",
      prix: 89,
      notation: 4.7,
      avis: 145,
      images: [
        "/decoration/cuisine/bocaux-verre-1.jpg"
      ],
      marque: "Kitchen Storage",
      categorie: "Cuisine",
      sousCategorie: "Accessoires déco",
      caracteristiques: [
        {nom: "Contenu", valeur: "6 bocaux (0.5L, 1L, 1.5L x2, 2L x2)"},
        {nom: "Matériaux", valeur: "Verre, bambou, silicone"},
        {nom: "Étanchéité", valeur: "Joint silicone alimentaire"},
        {nom: "Compatibilité", valeur: "Lave-vaisselle safe (verre seulement)"},
        {nom: "Style", valeur: "Moderne fonctionnel"}
      ],
      materiaux: "Verre, bambou, silicone",
      dimensions: "Diverses selon contenance",
      entretien: "Lave-vaisselle (verre seulement)",
      couleurs: "Verre transparent, bambou naturel",
      garantie: "1 an",
      stock: 20
    },
  
    // Textiles
    {
      id: 'CU-TX-001',
      nom: "Set de torchons et nappe assortis lin et coton",
      descriptionCourte: "Set cuisine 6 torchons + nappe 160x260 cm",
      descriptionLongue: "Set complet pour cuisine comprenant 6 torchons et 1 nappe 160x260 cm en lin et coton. Motif rayé moderne aux couleurs neutres (écru et gris). Haute absorption pour les torchons, résistance aux lavages répétés. Nappe avec ourtage surjeté pour une finition propre et durable. Ensemble coordonné pour une cuisine harmonieuse.",
      prix: 129,
      notation: 4.6,
      avis: 112,
      images: [
        "/decoration/cuisine/set-torchons-1.jpg"
      ],
      marque: "Textile Home",
      categorie: "Cuisine",
      sousCategorie: "Textiles",
      caracteristiques: [
        {nom: "Composition", valeur: "50% lin, 50% coton"},
        {nom: "Contenu", valeur: "6 torchons 50x70 cm + 1 nappe 160x260 cm"},
        {nom: "Entretien", valeur: "Lavage machine 60°C"},
        {nom: "Motif", valeur: "Rayures écru et gris"},
        {nom: "Origine", valeur: "Confection France"}
      ],
      materiaux: "50% lin, 50% coton",
      dimensions: "Torchons: 50x70 cm, Nappe: 160x260 cm",
      entretien: "Lavage machine 60°C, repassage modéré",
      couleurs: "Écru et gris",
      garantie: "1 an",
      stock: 18
    }
  ];
  export default cuisine;