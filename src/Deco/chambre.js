export const chambre = [
    // Literie & Matelas
    {
      id: 'CH-LM-001',
      nom: "Ensemble de literie premium en coton égyptien",
      descriptionCourte: "Ensemble de literie 5 pièces 100% coton égyptien 600 fils",
      descriptionLongue: "Ensemble de literie 5 pièces (1 drap housse, 1 drap plat, 2 taies d'oreiller, 1 housse de couette) en coton égyptien 100% pur 600 fils. Texture douce et respirante, résistant au rétrécissement et aux décolorations. Disponible en plusieurs coloris neutres.",
      prix: 189,
      prixPromo: 159,
      notation: 4.8,
      avis: 342,
      images: [
        "/decoration/chambre/literie-egyptienne-1.jpg",
        "/decoration/chambre/literie-egyptienne-2.jpg"
      ],
      marque: "Maison Blanc",
      categorie: "Chambre",
      sousCategorie: "Literie & Matelas",
      caracteristiques: [
        {nom: "Composition", valeur: "100% coton égyptien"},
        {nom: "Densité", valeur: "600 fils/cm²"},
        {nom: "Tailles disponibles", valeur: "90x200, 140x200, 160x200, 180x200, 200x200"},
        {nom: "Entretien", valeur: "Lavage machine 60°C"},
        {nom: "Couleurs", valeur: "Blanc, écru, gris perle, bleu lavande"}
      ],
      materiaux: "Coton égyptien 100%",
      dimensions: "Selon taille choisie",
      entretien: "Lavage machine 60°C, séchage en machine possible",
      couleurs: "Blanc, écru, gris perle, bleu lavande",
      garantie: "2 ans",
      stock: 15,
      bestseller: true
    },
  
    // Rangements
    {
      id: 'CH-RA-001',
      nom: "Commode scandinave 6 tiroirs en chêne massif",
      descriptionCourte: "Commode design 6 tiroirs avec poignées cuir",
      descriptionLongue: "Commode scandinave élégante avec 6 tiroirs spacieux. Structure en chêne massif et panneaux en contreplaqué de bouleau. Poignées en cuir véritable, pieds fuselés. Finition naturelle à l'huile écologique. Dimensions parfaites pour une chambre à coucher.",
      prix: 599,
      notation: 4.7,
      avis: 128,
      images: [
        "/decoration/chambre/commode-chene-1.jpg"
      ],
      marque: "Nordic Wood",
      categorie: "Chambre",
      sousCategorie: "Rangements",
      caracteristiques: [
        {nom: "Matériau", valeur: "Chêne massif et contreplaqué bouleau"},
        {nom: "Dimensions", valeur: "120x45x80 cm"},
        {nom: "Couleur", valeur: "Chêne naturel"},
        {nom: "Poids", valeur: "45 kg"},
        {nom: "Montage", valeur: "Assemblage requis (notice incluse)"}
      ],
      materiaux: "Chêne massif, contreplaqué bouleau, cuir véritable",
      dimensions: "120x45x80 cm",
      entretien: "Nettoyage avec chiffon humide, éviter les produits abrasifs",
      couleurs: "Chêne naturel",
      garantie: "5 ans",
      stock: 8
    },
  
    // Éclairage
    {
      id: 'CH-EC-001',
      nom: "Lampe de chevet design en marbre et laiton",
      descriptionCourte: "Lampe de chevet avec abat-jour en lin, base marbre",
      descriptionLongue: "Lampe de chevet élégante avec base en marbre de Carrare véritable et structure en laiton. Abat-jour en lin naturel pour une lumière douce et diffuse. Interrupteur intégré sur le cordon. Ampoule LED incluse (E27, 5W, 2700K). Parfaite pour créer une ambiance chaleureuse dans la chambre.",
      prix: 149,
      notation: 4.9,
      avis: 267,
      images: [
        "/decoration/chambre/lampe-marbre-1.jpg",
        "/decoration/chambre/lampe-marbre-2.jpg"
      ],
      marque: "Lumina",
      categorie: "Chambre",
      sousCategorie: "Éclairage",
      caracteristiques: [
        {nom: "Matériaux", valeur: "Marbre de Carrare, laiton, lin"},
        {nom: "Hauteur", valeur: "55 cm"},
        {nom: "Diamètre abat-jour", valeur: "35 cm"},
        {nom: "Type d'ampoule", valeur: "LED E27 incluse (5W, 2700K)"},
        {nom: "Câble", valeur: "1.8 m, couleur noir"}
      ],
      materiaux: "Marbre de Carrare, laiton, lin",
      dimensions: "35x35x55 cm",
      entretien: "Nettoyage avec chiffon sec",
      couleurs: "Marbre naturel, laiton doré",
      garantie: "3 ans",
      stock: 12,
      nouveaute: true
    },
  
    // Textiles
    {
      id: 'CH-TX-001',
      nom: "Plaid ultra-doux en cachemire et laine mérinos",
      descriptionCourte: "Plaid 150x200 cm en cachemire et laine mérinos",
      descriptionLongue: "Plaid d'exception tissé à la main à partir d'un mélange premium de cachemire (30%) et de laine mérinos (70%). D'une douceur incomparable, chaud mais léger. Dimensions 150x200 cm, franges sur les côtés. Disponible en plusieurs coloris naturels. Parfait pour la chambre ou le salon.",
      prix: 229,
      notation: 4.8,
      avis: 189,
      images: [
        "/decoration/chambre/plaid-cachemire-1.jpg"
      ],
      marque: "Artisan Wool",
      categorie: "Chambre",
      sousCategorie: "Textiles",
      caracteristiques: [
        {nom: "Composition", valeur: "30% cachemire, 70% laine mérinos"},
        {nom: "Dimensions", valeur: "150x200 cm"},
        {nom: "Poids", valeur: "1.2 kg"},
        {nom: "Entretien", valeur: "Nettoyage à sec recommandé"},
        {nom: "Origine", valeur: "Tissé main en Italie"}
      ],
      materiaux: "Cachemire et laine mérinos",
      dimensions: "150x200 cm",
      entretien: "Nettoyage à sec recommandé",
      couleurs: "Gris chiné, taupe, crème, bordeaux",
      garantie: "1 an",
      stock: 10
    },
  
    // Miroirs & Décoration murale
    {
      id: 'CH-MI-001',
      nom: "Miroir ovale avec cadre en bois sculpté",
      descriptionCourte: "Miroir décoratif 80x60 cm avec cadre bois sculpté",
      descriptionLongue: "Miroir ovale élégant avec cadre en bois massif sculpté à motifs feuillagés. Finition patinée vieil or. Dimensions totales 80x60 cm, épaisseur du cadre 8 cm. Fixation murale solide incluse. Parfait pour agrandir visuellement l'espace et ajouter une touche d'élégance à votre chambre.",
      prix: 179,
      notation: 4.6,
      avis: 94,
      images: [
        "/decoration/chambre/miroir-ovale-1.jpg"
      ],
      marque: "Belle Déco",
      categorie: "Chambre",
      sousCategorie: "Miroirs & Décoration murale",
      caracteristiques: [
        {nom: "Dimensions", valeur: "80x60 cm (ovale)"},
        {nom: "Épaisseur cadre", valeur: "8 cm"},
        {nom: "Poids", valeur: "5.2 kg"},
        {nom: "Type de fixation", valeur: "Système français avec câble"},
        {nom: "Couleur", valeur: "Bois teinté vieil or"}
      ],
      materiaux: "Verre trempé, bois massif",
      dimensions: "80x60 cm",
      entretien: "Nettoyage verre avec produit adapté",
      couleurs: "Bois teinté vieil or",
      garantie: "2 ans",
      stock: 7
    },
  
    // Mobilier
    {
      id: 'CH-MO-001',
      nom: "Table de chevet design avec tiroir et étagère",
      descriptionCourte: "Table de chevet en bois et métal avec storage",
      descriptionLongue: "Table de chevet contemporaine avec structure en métal noir et plateau en bois de hévéa massif. Comprend un tiroir et une étagère ouverte pour un rangement pratique. Design épuré aux lignes minimalistes. Hauteur idéale pour la plupart des lits. Facile à assembler.",
      prix: 129,
      prixPromo: 99,
      notation: 4.5,
      avis: 203,
      images: [
        "/decoration/chambre/table-chevet-1.jpg"
      ],
      marque: "Urban Living",
      categorie: "Chambre",
      sousCategorie: "Mobilier",
      caracteristiques: [
        {nom: "Matériaux", valeur: "Bois d'hévéa massif et métal"},
        {nom: "Dimensions", valeur: "45x40x55 cm"},
        {nom: "Couleur", valeur: "Métal noir/bois naturel"},
        {nom: "Poids", valeur: "8.5 kg"},
        {nom: "Charge maximale", valeur: "15 kg sur le plateau"}
      ],
      materiaux: "Bois d'hévéa massif, métal",
      dimensions: "45x40x55 cm",
      entretien: "Nettoyage avec chiffon humide",
      couleurs: "Métal noir/bois naturel",
      garantie: "2 ans",
      stock: 18,
      bestseller: true
    },
  
    // Accessoires de nuit
    {
      id: 'CH-AN-001',
      nom: "Set de coffret à bijoux en céramique émaillée",
      descriptionCourte: "Coffret à bijoux 3 pièces avec miroir",
      descriptionLongue: "Set élégant de 3 coffrets à bijoux en céramique émaillée avec couvercles à motif floral. Inclut un miroir à main. Parfait pour ranger bijoux, montres et petits accessoires. Finition lustrée, intérieur doublé de velours. Design vintage et romantique pour une table de chevet.",
      prix: 79,
      notation: 4.7,
      avis: 156,
      images: [
        "/decoration/chambre/coffret-bijoux-1.jpg"
      ],
      marque: "Porcelaine & Co",
      categorie: "Chambre",
      sousCategorie: "Accessoires de nuit",
      caracteristiques: [
        {nom: "Matériau", valeur: "Céramique émaillée"},
        {nom: "Contenu", valeur: "3 boîtes (ø12, ø9, ø6 cm) + miroir"},
        {nom: "Intérieur", valeur: "Doublure velours"},
        {nom: "Style", valeur: "Vintage floral"},
        {nom: "Pays d'origine", valeur: "Portugal"}
      ],
      materiaux: "Céramique émaillée, velours",
      dimensions: "Boîtes: ø12, ø9, ø6 cm - Miroir: 15x10 cm",
      entretien: "Nettoyage à sec uniquement",
      couleurs: "Blanc avec motifs bleus et dorés",
      garantie: "1 an",
      stock: 22
    }
  ];
  export default chambre;