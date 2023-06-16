# HotTakes

## Controllers/user
### Renforcement du mot de passe
Mise en place d'uneconstante validatePassword pour déclarer la regex.
Si le mot de passe ne comporte pas au moins une majuscule, une minuscule, un caractère spécial et un chiffre, alors celui-ci ne sera pas valide.
Si le mot de passe ne comporte pas un minimum de 12 caractère, alors celui-ci ne sera pas valide.