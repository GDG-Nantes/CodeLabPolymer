# Notes pour nous
Le but est de créer un composant comme dans le code lab de google. J'ai juste modifié le codelab afin de rajouter des étapes et de ne pas arriver direct à la phase utilisation de Polymer Paper !  Car en fait ce que veulent les gens en premier lieu c'est créer N composants, les voir interagir etc...


# Description des répertoires

* starter : répertoire de départ, il sera remplit de façon incrémentale ! 
* step-1 : création du composant post-card
* step-2 : création du comoposant post-list
* step-3+ : équivalent au steps de Google

# Step 1 

## Création du composant fichier html post-card.html

```html
<link rel="import" href="../components/polymer/polymer.html">

<polymer-element name="post-card">
    <template>
        <div> 
            Hello GDG Folks !
        </div>
    </template>
    <script>
        Polymer({

        });
    </script>
</polymer-element>
``` 

Ne pas oublier le 

```html
<link rel="import" href="../components/polymer/polymer.html">
```

Ne pas oublier non plus l'appel à Polymer
Sans ça on ne peut pas afficher le contenu ! 

## Mis à jour du index.html

```html
<link rel="import" href="post-card.html"> 

...

<body unresolved>

    <post-card></post-card>

    ...
```

1. Import du html ! 
2. Ajout du unresolved pour éviter le ```flash of unstyled content FOUC``` sur les navigateurs qui n'ont pas nativement les customs éléments (cf codelab google )
3. Ajout de la balise post-card
