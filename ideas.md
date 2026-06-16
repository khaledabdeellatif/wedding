# Brainstorming Design - Mariage Mariem & Ghassen

## Trois Approches Stylistiques

### 1. **Minimalisme Luxueux Contemporain**
Esthétique épurée avec typographie géométrique, espaces blancs généreux, et accents or discrets. Inspiration : design suisse moderne appliqué au mariage.
**Probabilité: 0.03**

### 2. **Romantisme Numérique Intemporel**
Fusion de l'élégance classique (sérifs, ornements subtils) avec des animations fluides et des transitions cinématiques. Inspiration : invitation papier haut de gamme transposée au digital.
**Probabilité: 0.07**

### 3. **Opulence Contemporaine avec Glassmorphisme**
Fond beige-ivoire avec couches de verre dépoli, or liquide, et particules flottantes. Typographie mixte (serif + sans-serif). Inspiration : luxury tech meets wedding elegance.
**Probabilité: 0.02**

---

## Approche Sélectionnée: **Romantisme Numérique Intemporel**

### Design Movement
**Néoclassicisme Digital** — fusion de l'élégance intemporelle des invitations papier de luxe avec les capacités cinématiques du web moderne. Références : design de haute couture, invitations de palais royaux, et interfaces premium contemporaines.

### Core Principles
1. **Élégance Intemporelle** : Chaque élément respire la sophistication sans datation. Les formes sont pures, les transitions gracieuses.
2. **Narratif Émotionnel** : Le site raconte une histoire d'amour à travers des animations d'entrée, des révélations progressives et des micro-interactions.
3. **Hiérarchie Subtile** : L'importance est communiquée par la taille, l'espacement et la profondeur, pas par la couleur criarde.
4. **Minimalisme Intentionnel** : Chaque pixel sert un but. Pas de décoration gratuite, mais chaque détail renforce l'émotion.

### Color Philosophy
- **Palette Primaire** : Or (#D4AF37), Ivoire (#FFFFF0), Beige Chaud (#F5E6D3)
- **Palette Secondaire** : Taupe Doux (#A89968), Blanc Cassé (#FAF8F3)
- **Accents** : Or Rose (#E8B4A8) pour les touches romantiques
- **Textes** : Charbon Profond (#2C2C2C) sur fonds clairs, Ivoire sur fonds sombres

**Raisonnement** : L'or évoque la luxe et la célébration. L'ivoire et le beige créent une base intemporelle et apaisante. Les nuances chaudes (or rose, taupe) ajoutent de la profondeur sans surcharger.

### Layout Paradigm
**Asymétrique Fluide** — sections qui se déploient progressivement. La première section (enveloppe animée) occupe le plein écran. Les sections suivantes utilisent des grilles décalées : texte à gauche, image à droite, puis inversé. Cela crée du mouvement visuel sans chaos.

### Signature Elements
1. **Sceau Doré Animé** : Logo/monogramme M&G en or, apparaissant avec un effet de tampon de cire lors du chargement.
2. **Enveloppe Ouvrante** : Effet de déploiement d'invitation papier au premier scroll.
3. **Particules Flottantes** : Pétales/confettis subtils qui flottent en arrière-plan, réagissant au scroll.
4. **Séparateurs Ornementaux** : Filets dorés minimalistes et symboles (✦, ✧) entre les sections.

### Interaction Philosophy
- **Hover States** : Textes et boutons développent une légère lueur dorée et se soulèvent légèrement (transform: translateY).
- **Scroll Triggers** : Les sections apparaissent avec des fade-in et des glissements doux au scroll.
- **Clic/Tap** : Les boutons RSVP, galerie et carte réagissent avec des animations de confirmation (scale + fade).
- **Pas de Chargement Brutal** : Chaque interaction est annoncée, jamais surprenante.

### Animation
- **Entrance** : Fade-in + translateY(-20px) avec easing ease-out, durée 600-800ms.
- **Hover** : Scale(1.02) + box-shadow doré, durée 200ms.
- **Countdown** : Chiffres qui "flip" doucement (rotation 3D) chaque seconde.
- **Parallax Subtil** : Images se déplacent légèrement lors du scroll (translateY 5-10%).
- **Particules** : Animation infinie avec opacity et translateY variables, vitesse 8-15s.
- **Respect prefers-reduced-motion** : Toutes les animations sont désactivées si l'utilisateur préfère.

### Typography System
- **Headings** : "Playfair Display" (serif, poids 700) — élégant, intemporel, associé à la haute couture.
- **Subheadings** : "Playfair Display" (serif, poids 400) — plus léger, pour les sous-titres.
- **Body Text** : "Lato" (sans-serif, poids 400) — lisible, moderne, contrasté avec le serif.
- **Accents/CTA** : "Lato" (sans-serif, poids 600) — pour les boutons et appels à l'action.
- **Hiérarchie** : H1 (48px), H2 (36px), H3 (28px), Body (16px), Small (14px).

### Brand Essence
**Ligne de Positionnement** : Une célébration numérique de l'amour intemporel, où chaque détail respire l'élégance et l'émotion.
**Trois Adjectifs** : Intemporel, Émotionnel, Luxueux.

### Brand Voice
- **Ton** : Poétique mais accessible. Formel sans être distant. Chaleureux sans être familier.
- **Headlines** : "Nous nous marions" (simple, direct, émotionnel), "Rejoignez-nous pour célébrer" (invitation chaleureuse).
- **CTAs** : "Confirmer ma présence" (personnel), "Découvrir notre histoire" (curieux).
- **Microcopy** : "Laissez-vous porter par la magie du moment", "Chaque détail a été pensé pour vous".

### Wordmark & Logo
**Monogramme M&G** : Deux lettres stylisées en serif (Playfair Display), entrelacées avec une délicatesse, encadrées d'un cercle doré fin. Pas de texte, juste le symbole. Utilisé comme favicon et dans le header.

### Signature Brand Color
**Or Luxe (#D4AF37)** — couleur incontournable du brand. Utilisée pour les accents, les séparateurs, les hover states, et les éléments clés. C'est la signature visuelle immédiate.

---

## Résumé Exécutif
Ce design crée une expérience web qui se sent comme une invitation papier haut de gamme, mais avec la magie du digital. Chaque animation renforce l'émotion, chaque couleur apaise et inspire, et chaque interaction confirme que l'utilisateur est bienvenu dans une célébration d'amour.
