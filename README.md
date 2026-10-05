# Metal Pro FR — Revue du site

Site vitrine B2B statique (3 pages HTML : `index.html`, `materiel-btp.html`, `structures-sur-mesure.html`), sans framework, CSS inline dupliqué par page, formulaire de contact via Formspree.

## Points forts

- Design soigné et cohérent (palette noir/or, typographie DM Serif Display + DM Sans).
- Contenu orienté conversion, CTA "devis" répétés à chaque section.
- Mentions SIREN / TVA / RCS visibles — bonne pratique de confiance en B2B.
- Structure HTML sémantique correcte (`nav`, `section`, `footer`).
- URLs propres, `sitemap.xml` présent.

## Problèmes critiques (à corriger en priorité)

1. **Aucune media query — site non responsive.** 0 `@media` dans les 3 fichiers. Toutes les grilles (hero, produits 3 colonnes, galerie, contact, footer) restent multi-colonnes sur mobile. Le site est probablement illisible/cassé sur smartphone, alors que le public BTP consulte massivement depuis un téléphone sur chantier.
2. **Images en base64 inline → pages énormes.** `index.html` = 821 Ko, `materiel-btp.html` = 1,5 Mo (un seul blob d'image fait ~330 Ko décodé). Le base64 ajoute ~33 % de poids, empêche la mise en cache navigateur/CDN par image et bloque le rendu du HTML. Temps de chargement très pénalisé, surtout en 4G chantier.
3. **Téléphone non cliquable.** `+33 06 83 20 15 41` est un simple texte, sans lien `tel:`. Sur mobile, "appeler" est l'action n°1 attendue pour un B2B.
4. **Format de téléphone incorrect.** L'indicatif international `+33` est combiné avec le `0` initial — devrait être `+33 6 83 20 15 41`.
5. **Message de confirmation du formulaire mort.** `<div id="merci">` (`display:none`) n'est jamais affiché : le formulaire soumet en POST classique vers Formspree sans JS pour intercepter la réponse. L'utilisateur est redirigé vers Formspree au lieu de voir une confirmation sur le site.
6. **Liens de pied de page cassés.** "Mentions légales", "CGV", "Confidentialité" pointent vers `#` — pages inexistantes. Problématique légalement (mentions légales obligatoires en France pour une SAS) et pour la crédibilité B2B.
7. **Pas de protection anti-spam sur le formulaire.** Aucun honeypot ni captcha — la clé Formspree publique (`mdawlwzd`) risque de recevoir du spam de bots.

## SEO / Découvrabilité

- Meta description présente uniquement sur `index.html`, absente sur les 2 autres pages.
- Aucune balise `canonical`.
- Aucune balise Open Graph / Twitter Card → partage sur réseaux sociaux sans aperçu (titre/image génériques).
- Aucune donnée structurée JSON-LD (`schema.org/LocalBusiness`) → opportunité manquée pour le SEO local et les rich snippets Google.
- Aucun `robots.txt`.
- `sitemap.xml` minimal (3 URLs) mais correct.

## Performance

- Aucun `preconnect`/`preload` vers `fonts.googleapis.com` / `fonts.gstatic.com` → la police bloque le rendu plus longtemps que nécessaire.
- CSS entièrement dupliqué (copié-collé) dans les 3 fichiers → pas de cache partagé entre pages, maintenance risquée (un changement de couleur = 3 fichiers à modifier).
- Aucun `loading="lazy"` sur les images hors écran.
- Poids total des 3 pages : environ 2,3 Mo, très majoritairement des images en base64.

## Accessibilité

- Champs de formulaire sans `<label>` : uniquement des `placeholder`, ce qui échoue aux critères WCAG (le placeholder disparaît à la saisie et n'est pas lié programmatiquement au champ).
- Contraste du doré (`#c8a45a`) à vérifier sur fond clair, en particulier pour les liens/texte fin.
- Pas de skip-link pour la navigation clavier.
- Boutons avec `onclick` JS inline (`scrollIntoView`) au lieu de simples ancres `<a href="#contact">` : fonctionne, mais moins robuste et échoue silencieusement si JS est désactivé.

## Cohérence / Contenu

- `structures-sur-mesure.html` ne présente que 2 réalisations, alors que la page est promue comme "Voir les réalisations" — contenu maigre comparé aux 5 photos de `materiel-btp.html`.
- Pas de page 404 personnalisée.

## Recommandations priorisées

### Impact élevé, effort faible — à faire en premier
1. Ajouter des media queries (breakpoints ~768px / ~480px) pour passer les grilles en colonne unique sur mobile.
2. Extraire les images en fichiers séparés compressés (WebP), avec `loading="lazy"`, au lieu du base64 inline.
3. Rendre le téléphone cliquable : `<a href="tel:+33683201541">` et corriger le format affiché.
4. Ajouter un vrai gestionnaire JS (`fetch` + `preventDefault`) pour afficher `#merci` après succès du formulaire, ou rediriger vers une page de remerciement dédiée.
5. Créer les pages mentions légales / CGV / confidentialité et corriger les liens du footer.

### Court terme — SEO et confiance
6. Ajouter meta description + canonical + Open Graph sur chaque page.
7. Ajouter un schema.org `LocalBusiness`/`Organization` en JSON-LD (adresse, téléphone, SIREN).
8. Ajouter un `robots.txt`.
9. Ajouter un honeypot ou reCAPTCHA/hCaptcha au formulaire.

### Structurel — maintenabilité
10. Sortir le CSS dupliqué dans un fichier `styles.css` partagé, chargé par les 3 pages.
11. Ajouter des `<label>` associés aux champs du formulaire (visibles ou visually-hidden).
12. Ajouter `rel="preconnect"` vers Google Fonts.
13. Étoffer la galerie "structures sur mesure" avec davantage de réalisations.
14. Ajouter une page 404.


# Ce qui a été fait :
- Responsive : ajout de media queries sur toutes les pages (le site était totalement non-responsive avant, 0 @media dans le CSS d'origine).
- Performance : images sorties du base64 inline vers des fichiers WebP compressés avec loading="lazy" — les pages HTML sont passées de ~2,3 Mo à ~40 Ko au total.
- CSS : extraction du CSS commun (nav, footer, boutons, variables) dans assets/css/common.css, fini la duplication à 3 endroits.
- SEO : meta description + canonical + Open Graph/Twitter Card sur chaque page, JSON-LD LocalBusiness sur l'accueil, robots.txt.
- Formulaire : envoi en AJAX avec vrai message de succès/erreur visible (avant, le message ne s'affichait jamais), champ honeypot anti-spam, labels accessibles.
- Téléphone : cliquable (tel:) et format corrigé (+33 6 83 20 15 41).
- Pages légales : mentions-legales.html, cgv.html, confidentialite.html créées, liens du footer réparés (pointaient vers #).
- 404.html ajouté, skip-links et focus visible pour l'accessibilité clavier.

Point à traiter de ton côté : dans mentions-legales.html, le champ capital social est marqué [à compléter] — je n'avais pas cette donnée et il est légalement obligatoire pour une SAS. Et les CGV sont un brouillon à faire valider par un professionnel du droit avant publication réelle (mention ajoutée dans la page).

## Référencement (SEO) : guide pratique

Les bases techniques (meta description, canonical, Open Graph, JSON-LD, robots.txt, sitemap.xml) sont déjà en place sur le site. Le plan d'action complet — Google Search Console, Google Business Profile, contenu et mots-clés par page, balisage structuré, backlinks, et une partie dédiée aux autres moteurs (Bing, Qwant, moteurs IA) — est dans [SEO-GUIDE.md](SEO-GUIDE.md).

## Google Ads : guide pratique

Le SEO (section précédente) prend du temps à porter ses fruits (plusieurs mois). Google Ads permet d'obtenir de la visibilité immédiate, moyennant un budget publicitaire — utile pour générer des devis pendant que le référencement naturel monte en puissance.

### 1. Prérequis avant de lancer une campagne
- Avoir Google Search Console et Google Analytics (ou équivalent) installés pour mesurer ce qui se passe après le clic — sans suivi des conversions, impossible de savoir si les annonces rapportent des devis ou juste des visites.
- S'assurer que le formulaire de contact fonctionne bien et affiche une confirmation claire (déjà corrigé, voir "Ce qui a été fait") : c'est la page qui va convertir le trafic payant, elle doit être irréprochable.
- Avoir une page dédiée par service si possible (voir section SEO ci-dessus) : une annonce "garde-corps métallique sur mesure" qui pointe vers une page dédiée convertit bien mieux que vers la page d'accueil générale.

### 2. Créer le compte et le suivi des conversions
- Créer un compte sur [ads.google.com](https://ads.google.com).
- Lier le compte à Google Analytics et/ou Search Console (Outils et paramètres > Comptes associés).
- Configurer un **suivi de conversion** avant de dépenser le moindre euro :
  - Conversion "soumission du formulaire de contact" (déclenchée sur la page de confirmation ou via un événement JS au succès de l'envoi AJAX).
  - Conversion "clic sur le téléphone" (`tel:+33683201541`) — essentiel en B2B/BTP où beaucoup de clients préfèrent appeler directement.
  - Sans ce suivi, Google Ads optimise "à l'aveugle" et il est impossible de savoir quelles annonces/mots-clés génèrent réellement des devis.

### 3. Type de campagne recommandé pour ce site
Pour une activité B2B locale (métallerie/BTP), privilégier dans cet ordre :
1. **Campagne Search (recherche)** ciblée sur des mots-clés à forte intention commerciale : "métallerie [ville]", "structures métalliques sur mesure", "garde-corps industriel devis", "portail métallique BTP". C'est le format le plus efficace pour capter une demande déjà existante.
2. **Campagne Performance Max géolocalisée**, une fois qu'il y a assez de données de conversion (souvent après quelques semaines de campagne Search), pour élargir la portée sur Recherche + Display + Maps.
3. Éviter le Display seul en démarrage : bonne notoriété mais taux de conversion faible pour du B2B à forte valeur/faible volume comme la métallerie sur mesure.

### 4. Ciblage géographique et budget
- Restreindre le ciblage géographique à la zone réellement desservie (ville + rayon en km, ou départements) — un budget local mal ciblé se dilue vite sur des prospects hors zone.
- Exclure les recherches "emploi", "recrutement", "prix pas cher" si non pertinentes via des **mots-clés à exclure** (négatifs), pour ne pas payer des clics de curieux ou de candidats.
- Démarrer avec un budget journalier modeste (ex. 10-20 €/jour) le temps de valider quels mots-clés convertissent, puis augmenter progressivement sur ce qui fonctionne.

### 5. Rédaction des annonces
- Reprendre les mots-clés exacts dans le titre de l'annonce (meilleure pertinence = meilleur Quality Score = coût par clic plus bas).
- Mettre en avant les éléments de confiance déjà présents sur le site (SIREN/TVA visibles, mentions légales) et les CTA "devis gratuit".
- Utiliser les **extensions d'annonce** : extension d'appel (clic-to-call direct dans l'annonce, sans passer par le site), extension de lieu (fiche Google Business liée), extension de liens annexes vers les pages de service.

### 6. Suivi et optimisation
- Consulter chaque semaine le rapport de termes de recherche pour ajouter de nouveaux mots-clés négatifs et repérer des requêtes à fort potentiel non ciblées.
- Comparer le coût par conversion (devis/appel) entre campagnes/mots-clés et réallouer le budget vers ce qui convertit le mieux.
- Ne pas juger une campagne sur les clics ou impressions seuls : la métrique qui compte est le coût par devis obtenu, à comparer à la valeur moyenne d'un chantier.

**Priorité recommandée** : mettre en place le suivi de conversion (formulaire + clic téléphone) → lancer une campagne Search géolocalisée avec un petit budget test → affiner mots-clés et négatifs sur 2-4 semaines → augmenter le budget sur ce qui convertit.