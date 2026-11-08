# kommit-frontend

Frontend de Kommit, en React, TypeScript, Tailwind et ShadCN (avec BaseUI).

## Arborescence

```
kommit-frontend/
├── .claude/
│   ├── rules/         # les règles de comportement du repo
│   └── skills/        # les skills du repo
├── public/            # fichiers statiques servis tels quels
└── src/>
    ├── main.tsx        # point d'entrée : monte l'app dans le DOM
    ├── App.tsx         # assemblage de l'app : providers et routes
    ├── components/
    │   ├── ui/         # composants génériques, réutilisés par 2+ écrans
    │   └── pages/      # un dossier par écran, avec ses morceaux spécifiques
    ├── logic/          # logique métier, fonctions pures
    ├── lib/
    │   └── api/        # couche réseau, le seul endroit qui parle à l'API
    ├── data/           # contenu statique des écrans (textes, labels)
    ├── types/          # contrat d'API partagé avec le backend
    └── assets/         # images utilisées au runtime
```
