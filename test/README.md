# 🥪 Tosti Maker - CD3 Leerlingen Webapp

Een interactieve webapp ontwikkeld voor CD3-leerlingen rond het thema tosti maken/brood beleggen. De app is specifiek ontworpen voor kinderen met diverse ondersteuningsbehoeften en biedt verschillende niveaus van ondersteuning.

## 🎯 Doelgroep

- Kinderen met diverse ondersteuningsbehoeften
- Visueel ingestelde leerlingen
- Leerlingen met behoefte aan herhaling
- Kinderen die auditieve ondersteuning nodig hebben
- Leerlingen die knoppen/specifieke toetsen gebruiken voor navigatie

## 🎮 Functionaliteiten

### Moeilijkheidsniveaus

1. **Eenvoudig**: Alleen plaatjes (emoji's)
2. **Gemiddeld**: Plaatjes + woorden
3. **Moeilijk**: Alleen woorden

### Spelvormen

1. **🧠 Memory Spel**
   - Zoek dezelfde kaarten bij elkaar
   - 6 paren (12 kaarten totaal)
   - Auditieve feedback bij klikken

2. **🖱️ Sleepspel**
   - Sleep items naar de juiste plek
   - 5 items om te matchen
   - Visuele en auditieve feedback

3. **🍽️ Tafel Dekken**
   - Plaats bord, beker, vork en mes op tafel
   - Vrije plaatsing op tafeloppervlak
   - Realistische tafel-achtergrond

4. **🥪 Tosti Maken**
   - Maak een digitale tosti
   - Sleep boterham, kaas en ham naar de pan
   - Stap-voor-stap instructies

## 🎵 Auditieve Ondersteuning

- **Spraaksynthese**: Woorden worden uitgesproken bij klikken
- **Geluidsfeedback**: Succes- en foutgeluiden
- **Instelbaar**: Audio kan aan/uit gezet worden
- **Nederlandse uitspraak**: Geoptimaliseerd voor Nederlandse taal

## ⌨️ Toegankelijkheid

### Keyboard Navigation
- **Tab**: Navigeer tussen elementen
- **Enter/Spatie**: Selecteer/activeer elementen
- **Escape**: Terug naar menu of sluit dialogen

### Touchscreen Ondersteuning
- Grote knoppen voor eenvoudige bediening
- Touch-vriendelijke drag & drop
- Responsive ontwerp voor tablets

### Visuele Ondersteuning
- Hoge contrast kleuren
- Grote, duidelijke lettertypen
- Rustige achtergrond
- Duidelijke focus indicators

## 🛠️ Technische Specificaties

### Bestanden
- `index.html` - Hoofdpagina met alle game interfaces
- `styles.css` - Styling en responsive design
- `script.js` - Game logica en interactiviteit
- `README.md` - Deze documentatie

### Browser Ondersteuning
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Vereisten
- Moderne webbrowser met JavaScript ondersteuning
- Internetverbinding voor het laden van Sclera pictogrammen (eerste keer)
- Microfoon toegang voor spraaksynthese (optioneel)
- Touchscreen of muis voor interactie

## 📚 Woordenlijst

De app gebruikt [Sclera pictogrammen](https://www.sclera.be/) voor optimale toegankelijkheid. Deze pictogrammen zijn specifiek ontwikkeld voor mensen met communicatie- en leerbehoeften.

De app bevat de volgende woorden met bijbehorende Sclera pictogrammen:

| Woord | Sclera Pictogram | Beschrijving |
|-------|------------------|--------------|
| bord | [Sclera Bord](https://www.sclera.be/picto/overview/plate.png) | Eetbord |
| beker | [Sclera Beker](https://www.sclera.be/picto/overview/cup.png) | Drinkbeker |
| vork | [Sclera Vork](https://www.sclera.be/picto/overview/fork.png) | Eetvork |
| mes | [Sclera Mes](https://www.sclera.be/picto/overview/knife.png) | Mes |
| boterham | [Sclera Brood](https://www.sclera.be/picto/overview/bread.png) | Brood |
| boter | [Sclera Boter](https://www.sclera.be/picto/overview/butter.png) | Boter |
| kaas | [Sclera Kaas](https://www.sclera.be/picto/overview/cheese.png) | Kaas |
| tosti ijzer | [Sclera Sandwich](https://www.sclera.be/picto/overview/sandwich.png) | Tosti-ijzer |
| ham | [Sclera Vlees](https://www.sclera.be/picto/overview/meat.png) | Ham |
| melk | [Sclera Melk](https://www.sclera.be/picto/overview/milk.png) | Melk |

**Fallback systeem**: Als de Sclera pictogrammen niet laden, worden automatisch emoji's gebruikt als alternatief.

## 🎛️ Instellingen

### Leerkracht Menu
- **Moeilijkheidsniveau**: Pas het niveau aan tijdens het spelen
- **Audio aan/uit**: Schakel geluid in/uit
- **Toegankelijk**: Instellingen zijn volledig toetsenbord-navigeerbaar

### Progressie Tracking
- Visuele voortgangsindicator per spel
- Feedback bij voltooiing
- Beloningssysteem met emoji's

## 🚀 Gebruik

### Voor Leerkrachten
1. Open `index.html` in een webbrowser
2. Klik op het tandwiel-icoon voor instellingen
3. Stel het gewenste moeilijkheidsniveau in
4. Kies een spel voor de leerlingen
5. Begeleid leerlingen bij het spelen

### Voor Leerlingen
1. Kies een spel door erop te klikken
2. Volg de instructies op het scherm
3. Gebruik Tab en Enter voor toetsenbord navigatie
4. Luister naar de auditieve feedback
5. Vier je succes bij voltooiing!

## 🖨️ Printbare Versie

De app bevat print-stijlen voor offline gebruik:
- Verbergt navigatie-elementen
- Toont alleen de game-inhoud
- Geschikt voor uitprinten en offline activiteiten

## 🔧 Aanpassingen

### Nieuwe Woorden Toevoegen
Voeg nieuwe woorden toe aan de `vocabulary` object in `script.js`:

```javascript
const vocabulary = {
    nieuwWoord: { emoji: '🆕', audio: 'nieuw-woord' },
    // ... bestaande woorden
};
```

### Nieuwe Spellen Toevoegen
1. Voeg HTML toe aan `index.html`
2. Voeg CSS styling toe aan `styles.css`
3. Implementeer game logica in `script.js`
4. Voeg event listeners toe

## 📱 Responsive Design

De app is volledig responsive en werkt op:
- Desktop computers
- Laptops
- Tablets
- Touchscreens
- Smartboards

## 🎨 Design Principes

- **Sclera Pictogrammen**: Gebruik van professionele pictogrammen specifiek ontwikkeld voor mensen met communicatie- en leerbehoeften
- **Grote knoppen**: Minimaal 44px voor touch interfaces
- **Rustige achtergrond**: Zachte kleuren zonder afleiding
- **Duidelijke contrasten**: WCAG AA compliant
- **Consistente navigatie**: Herkenbare patronen
- **Visuele feedback**: Duidelijke reacties op acties

## 🖼️ Sclera Pictogrammen

De app maakt gebruik van [Sclera pictogrammen](https://www.sclera.be/), een professionele collectie pictogrammen die specifiek ontwikkeld zijn voor mensen met communicatie- en leerbehoeften. Deze pictogrammen bieden:

- **Consistente stijl**: Alle pictogrammen volgen hetzelfde design principe
- **Duidelijke betekenis**: Eenvoudige, herkenbare afbeeldingen
- **Toegankelijkheid**: Ontworpen voor mensen met diverse ondersteuningsbehoeften
- **Internationale standaard**: Breed gebruikt in onderwijs en zorg
- **Gratis gebruik**: Beschikbaar onder Creative Commons licentie

## 🔒 Privacy & Veiligheid

- Geen externe dependencies
- Geen data-opslag
- Geen tracking
- Werkt volledig offline
- Geen persoonlijke informatie verzameld

## 📞 Ondersteuning

Voor vragen of problemen:
1. Controleer of JavaScript is ingeschakeld
2. Test in een andere browser
3. Controleer console voor foutmeldingen
4. Zorg voor voldoende schermgrootte

## 🎯 Leerdoelen

De app ondersteunt de volgende leerdoelen:
- Woordenschat uitbreiding
- Visuele herkenning
- Auditieve verwerking
- Fijne motoriek (drag & drop)
- Probleemoplossend denken
- Digitale vaardigheden

## 🔄 Updates

### Versie 1.0
- Basis functionaliteit
- 4 spellen
- 3 moeilijkheidsniveaus
- Auditieve ondersteuning
- Toegankelijkheidsfuncties

---

**Ontwikkeld voor CD3-leerlingen met speciale aandacht voor toegankelijkheid en gebruiksvriendelijkheid.**
