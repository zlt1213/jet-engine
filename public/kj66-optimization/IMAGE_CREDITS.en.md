# Image credits and provenance

All article images are stored locally in `assets/`. No website photographs or published paper figures are reproduced in the article.

## CAD illustrations

Images 01–08 were rendered for this package from the user-supplied R3 STEP geometry using CadQuery/Open CASCADE tessellation and VTK rendering. Existing model colours were retained. Non-relevant components were hidden for subsystem views; the geometry shown was not redesigned. Render-window whitespace was cropped and the views were scaled for layout. Headers and status footers were added.

These are CAD visualizations, not photographs, generated CFD fields, measured temperature distributions, optimized designs or machining drawings. Blade and bearing features remain reference reconstructions. A nominal gap visible in an image must not be interpreted as an approved running clearance.

| Local image | Subject | Geometric source |
|---|---|---|
| `01-kj66-r3-cutaway.png` | Overall three-quarter section | `KJ66_R3_ASSEMBLED_3QUARTER.step` |
| `02-shaft-bearings-lubrication.png` | Shaft, support and lubrication region | Same section file; other components hidden |
| `03-compressor-diffuser.png` | Compressor, cover and diffuser region | Same section file; other components hidden |
| `04-combustor-fuel-routes.png` | Combustor, vaporizers and fuel circuit | Same section file; other components hidden |
| `05-compressor-cover-clearance.png` | Compressor/cover interface | Same section file; other components hidden |
| `06-turbine-nozzle.png` | Guide vanes, turbine and exhaust | Same section file; other components hidden |
| `07-casing-and-supports.png` | Casing, shaft tunnel and support features | Same section file; other components hidden |
| `08-impeller-diffuser-full.png` | Full impeller and diffuser stage | `KJ66_R3_ASSEMBLY.step`; cover and other components hidden |

Suggested credit: **“Project CAD visualization from the supplied KJ66 R3 reconstruction; geometry shown for review, not an engineering release.”**

The original drawings and any third-party rights underlying the supplied CAD have not been independently cleared. This package does not assign a new licence to those underlying materials or warrant ownership of them. The project owner should retain the appropriate source acknowledgements when publishing.

## Research-data plots

- `09-published-compressor-efficiency.png`
- `10-published-compressor-pressure-ratio.png`

These are newly drawn bar charts, not copies or tracings of the publisher's figures. Numerical source: Junting Xiang, Jörg Uwe Schlüter and Fei Duan, *Study of KJ-66 micro gas turbine compressor: Steady and unsteady Reynolds-averaged Navier–Stokes approach*, journal issue 2017, first online 2016. [DOI: 10.1177/0954410016644632](https://journals.sagepub.com/doi/10.1177/0954410016644632).

Preserve the source attribution and the warnings about speed-line maxima and R3 status in both the chart and its article caption. Underlying values are recorded in `data/published-compressor-peaks.json`.

## Earlier website images

The Max Prototypes pictures discussed previously are **not contained in `assets/`**. Their downloads failed and no republication permission was verified. See `REFERENCE_PHOTOS.md` for links. They must not be described as photographs of this project.
