# Guide SEO — metalpro-france.fr

État des lieux (ce qui est déjà fait, vérifié dans le code) :
- Title, meta description, canonical, Open Graph/Twitter Card sur chaque page ✅
- JSON-LD `LocalBusiness` sur la page d'accueil ✅
- `sitemap.xml` + `robots.txt` avec référence au sitemap ✅
- Images en `.webp`, `loading="lazy"`, attributs `alt` renseignés ✅
- Un seul `<h1>` par page ✅

Le socle technique est correct. Le travail qui reste à faire est surtout **hors-code** : Search Console, fiche Google Business, contenu, avis clients, backlinks. Voici l'ordre des priorités.

---

# Partie 1 — Google (le moteur prioritaire, ~90% des recherches en France)

## Étape 1 — Google Search Console (aujourd'hui, 15 min)

1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété `metalpro-france.fr` (type "Domaine" si possible, sinon "Préfixe d'URL" `https://metalpro-france.fr/`)
3. Valider la propriété (enregistrement DNS TXT chez l'hébergeur du domaine, ou via le fichier HTML si le domaine n'est pas en gestion DNS directe)
4. Dans **Sitemaps**, soumettre `https://metalpro-france.fr/sitemap.xml`
5. Dans **Inspection d'URL**, demander l'indexation pour les 5 pages une par une (accueil + les 4 pages catalogue)

Sans Search Console, Google n'a aucune raison de crawler le site rapidement — c'est la première chose à faire, avant tout le reste.

## Étape 2 — Google Analytics 4 (aujourd'hui, 15 min)

1. Créer une propriété GA4 sur https://analytics.google.com
2. Récupérer l'ID de mesure (`G-XXXXXXX`)
3. Ajouter le script GA4 dans `<head>` de chaque page (ou dans un composant partagé si le site en a un)
4. Relier GA4 à Search Console (Admin GA4 → Liens de produits → Search Console)

But : savoir quels mots-clés amènent du trafic, et lesquels ne convertissent pas.

## Étape 3 — Fiche Google Business Profile (cette semaine, 30 min)

C'est le levier le plus fort pour une entreprise B2B locale (négoce de matériel BTP/métallerie) : le pack local "3 résultats + carte" apparaît souvent **avant** les résultats organiques classiques pour des recherches du type "métallerie Montreuil" ou "négoce matériel BTP Paris".

1. Créer/revendiquer la fiche sur https://business.google.com avec l'adresse exacte (86 Rue Voltaire, 93100 Montreuil)
2. Catégorie principale : "Fournisseur de matériel de construction" ou "Fabricant de structures métalliques" (choisir la plus proche)
3. Renseigner : téléphone (+33683201541), horaires (lun-ven 8h-18h, cohérent avec le JSON-LD du site), site web, description de l'activité
4. Ajouter 10-15 photos réelles (réalisations, atelier, produits — réutiliser celles du dossier `/photos` et `/images` du site)
5. Activer les messages et les questions/réponses
6. Publier une première "post" (nouveauté/réalisation)
7. Demander à 5-10 premiers clients satisfaits un avis Google (lien direct : créer un court-lien `g.page/r/...` depuis la fiche)

Les avis + la régularité des photos/posts comptent plus que le nombre d'avis pur pour le classement local.

Point de vigilance : faire correspondre **exactement** nom / adresse / téléphone (NAP — Name, Address, Phone) entre la fiche Google, le site et les mentions légales. La moindre incohérence (ex. "Rue Voltaire" vs "rue Voltaire", numéro de téléphone formaté différemment) nuit au référencement local.

## Étape 4 — Mots-clés et contenu par page (semaine 2)

Chaque page catalogue cible déjà un thème clair. Pour chacune, vérifier qu'elle répond à une **vraie requête tapée sur Google**, pas seulement à un nom de catégorie interne :

| Page | Requêtes probables à cibler |
|---|---|
| `materiel-btp.html` | "échafaudage modulaire France", "étais réglables prix", "négoce matériel BTP" |
| `structures-sur-mesure.html` | "fabrication structure métallique sur mesure", "chaudronnerie sur plan" |
| `clotures-metalliques-escaliers.html` | "clôture métallique industrielle", "escalier acier sur mesure", "portail site industriel" |
| `equipement-industriel.html` | "convoyeur à rouleaux", "châssis métallique atelier", "chariot de manutention sur mesure" |

Actions concrètes :
1. Utiliser Google Search Console (après 4-6 semaines de données) → rapport "Performances" → voir les requêtes qui affichent le site mais où le clic est faible → enrichir le texte de la page concernée avec ces termes exacts.
2. Ajouter sur chaque page catalogue un bloc de texte de 150-300 mots (pas juste des visuels/listes) qui répond aux questions qu'un acheteur se pose : délais de fabrication, zones de livraison, types de finitions, normes respectées. Google a besoin de texte à indexer, pas seulement d'images.
3. Ajouter une FAQ en bas de chaque page catalogue (3-5 questions/réponses) avec balisage `FAQPage` en JSON-LD — gain direct en rich snippets.
4. À plus long terme, envisager de découper les catalogues génériques en pages dédiées par produit/service (ex. `garde-corps.html`, `portails-industriels.html`, `escaliers-metalliques.html` plutôt qu'une seule page "Clôtures & Escaliers") : chaque page cible alors un mot-clé précis avec son propre `<h1>`, sa meta description et ses photos — plus de pages pertinentes = plus de portes d'entrée depuis la recherche.
5. Ajouter une page ou section dédiée à la zone géographique desservie (ville/département) : le SEO local repose beaucoup sur la présence du nom de la ville dans le contenu, les titres et les balises meta.

## Étape 5 — Enrichir le balisage structuré (semaine 2-3)

Le JSON-LD `LocalBusiness` actuel est bon mais minimal. À ajouter :

- Sur `index.html` : `sameAs` (liens vers les réseaux sociaux/fiche Google Business une fois créée), `priceRange`, `geo` (latitude/longitude de Montreuil)
- Sur chaque page catalogue : un bloc `Product` ou `Service` décrivant l'offre de la page
- Après l'étape 4 : un bloc `FAQPage` par page catalogue

Tester chaque page avec https://search.google.com/test/rich-results après modification.

## Étape 6 — Maillage interne et page manquante (semaine 3)

1. Vérifier que chaque page catalogue a un lien retour clair vers l'accueil et vers les autres catalogues (menu + liens contextuels dans le texte)
2. Créer une page "Réalisations" ou "Nos chantiers" si elle n'existe pas — c'est la page qui convertit le mieux en B2B (preuve sociale) et qui donne du contenu frais à indexer régulièrement
3. Ajouter cette page au `sitemap.xml`

## Étape 7 — Backlinks locaux (en continu, dès semaine 3)

Pour une entreprise locale, quelques liens de qualité pèsent plus que beaucoup de liens génériques :
1. Inscription annuaires professionnels pertinents : Pages Jaunes, Kompass, annuaire de la CCI locale, annuaire des fournisseurs BTP (Batiweb, Batiproduits)
2. Si membre d'une fédération/syndicat professionnel (métallerie, BTP) : demander un lien depuis leur annuaire de membres
3. Partenaires/fournisseurs/clients avec un site web : demander un lien croisé si pertinent
4. Éviter les annuaires génériques de mauvaise qualité ou l'achat de liens — risque de pénalité Google sans bénéfice réel

## Étape 8 — Suivi mensuel

Une fois par mois, dans Search Console :
- Vérifier "Couverture" → aucune erreur d'indexation
- Vérifier "Core Web Vitals" / "Expérience sur la page" → pas de régression de vitesse
- Regarder les nouvelles requêtes qui apparaissent → ajuster le contenu des pages en conséquence
- Vérifier les avis Google Business et y répondre systématiquement (même brièvement)

---

# Partie 2 — Autres moteurs de recherche (Bing, Qwant, moteurs IA)

Google capte l'essentiel des recherches en France, donc la Partie 1 reste prioritaire. Mais une fois ce socle posé, quelques actions ciblées permettent de capter le reste du trafic — sans dupliquer tout le travail, car le contenu et le balisage faits pour Google profitent directement à ces autres moteurs.

## Bing (et son réseau : Yahoo, DuckDuckGo, Ecosia)

Bing indexe environ 5-10% des recherches en France, mais alimente aussi les résultats de Yahoo, DuckDuckGo et Ecosia, et sert de base à Copilot (l'assistant IA de Microsoft) — un seul réglage profite donc à plusieurs moteurs d'un coup.

1. Créer un compte sur https://www.bing.com/webmasters
2. Utiliser la fonction **"Importer depuis Google Search Console"** : elle reprend automatiquement les propriétés, sitemaps et une partie des données, en quelques clics seulement
3. Vérifier que `sitemap.xml` est bien soumis (normalement fait automatiquement par l'import)
4. Consulter occasionnellement le rapport de performance Bing, mais sans attendre le même volume de trafic que sur Google

## Qwant

Moteur français qui met en avant la confidentialité ; une partie de son index s'appuie sur des technologies tierces (dont Bing). Il n'y a pas d'outil webmaster public équivalent à Search Console à configurer : le meilleur levier est un site techniquement propre et bien structuré (ce qui est déjà le cas ici), rien de spécifique à faire en plus.

## Moteurs de réponse IA (ChatGPT Search, Perplexity, Copilot, AI Overviews de Google)

De plus en plus de prospects B2B tapent une question dans un outil IA plutôt que dans un moteur classique ("quel fournisseur de structures métalliques sur mesure en Île-de-France"). Ces outils s'appuient sur les index existants (souvent Bing et Google) et favorisent les sites qui répondent clairement à une question précise. Ce qui aide ici n'est pas une "soumission" séparée, mais exactement ce qui est déjà prévu en Partie 1 :

- Du texte clair qui répond directement à une question (Étape 4)
- Du balisage `FAQPage` / `Product` / `Service` en JSON-LD (Étape 5)
- Des signaux de confiance : avis clients, mentions légales complètes, backlinks de qualité (Étapes 3 et 7)

→ Aucune action supplémentaire à planifier spécifiquement pour les moteurs IA : ils bénéficient automatiquement du travail de contenu et de structuration fait pour Google.

---

## Priorité si le temps est limité

1. Search Console + soumission sitemap (Étape 1) — sans ça, rien d'autre ne compte
2. Fiche Google Business Profile complète avec photos et avis (Étape 3) — impact le plus rapide pour une activité locale B2B
3. Contenu texte enrichi sur les 4 pages catalogue (Étape 4) — ce qui manque le plus aujourd'hui au site
4. Une fois les 3 points ci-dessus en place : import en 5 minutes dans Bing Webmaster Tools (Partie 2) — gain quasi gratuit sur Bing/Yahoo/DuckDuckGo/Ecosia
