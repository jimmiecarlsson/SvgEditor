# SVG Editor

En enkel SVG-editor byggd med **HTML, JavaScript och Bootstrap 5**.  
Här kan du rita former direkt i webbläsaren, justera färg och tjocklek, samt exportera resultatet som en `.svg`-fil.

## ✨ Funktioner
- **Verktyg:**
  - Path (frihand)
  - Line
  - Rect
  - Circle
  - Polyline
- **Stil:**
  - Välj stroke-färg via colorpicker
  - Välj linjetjocklek via number input
- **Export:**
  - Kopiera SVG-koden till urklipp
  - Ladda ner SVG som fil (`draw-1-YYMMDD.svg`, `draw-2-YYMMDD.svg` osv.)
  - Visa SVG-koden i en Bootstrap-modal
- **Canvas-hantering:**
  - Rensa hela canvas
  - Alla former sparas tills du rensar manuellt

## 📦 Teknik
- [Bootstrap 5](https://getbootstrap.com/) för layout, knappar och modals
- [Bootstrap Icons](https://icons.getbootstrap.com/) för verktygsikoner
- Vanilla JavaScript (ingen extern ramverk behövs)
- Modulstruktur (`editor.js` + en fil per verktyg)

## 🚀 Kom igång
1. Klona repot:
   ```bash
   git clone https://github.com/jimmiecarlsson/SvgEditor.git
   cd SvgEditor
   ```
2. Öppna `index.html` i din webbläsare (ingen build eller server krävs).
3. Välj ett verktyg i toolbaren och börja rita i canvas.
4. Justera färg/tjocklek vid behov.
5. Exportera SVG via modal eller ladda ner direkt.

## 📂 Projektstruktur
```
index.html         # Bootstrap-layout, toolbar, modal
editor.css         # Anpassad styling
editor.js          # Huvudlogik, toolbar, export, modal
path.js            # Frihand-verktyg
line.js            # Linje-verktyg
rect.js            # Rektangel-verktyg
circle.js          # Cirkel-verktyg
polyline.js        # Polyline-verktyg
```

## 🔧 Att bygga vidare på
- Utseendet och lite UX
- Lägg till fler former (ellipse, polygon, text, image)
- Stöd för fill-färg i stället för bara stroke
- Flytta / redigera redan ritade objekt
- Undo/redo-historik
- Export som PNG

## 📄 Licens
Projektet är fritt att använda och modifiera för eget bruk.
