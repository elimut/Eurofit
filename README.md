# Eurofit
 
Création serveur avec express
require express
mysql
port

dot env -> .env

cross origin ->
par défaut dév appli, quelque chose qui n'est pas sur le serveur ne peut pas accèder aux infos de ce serveur:
bdd sur serveur et appli, si appli pas sur même serveur cela pose problème, le cors origin va poser problème.
Cors permet de devenir un composant web, ressource distante, utilisable depuis n'importe quel autre serveur

installation cors -> npm i cors



cors:

>Par défaut, les navigateurs imposent une politique de sécurité same-origin qui limite comment une resource chargée depuis une origine peut intéragir avec une resource chargée depuis une autre origine. Si vous avez déjà essayé de faire des requêtes cross-origin en Ajax vous avez du faire les frais de cette polique et rencontrer l'erreur 


index. js routeur crée à la main

npm i express express-myconnection mysql nodemon cors
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' ; ALTER USER 'root'@'localhost' IDENTIFIÉ AVEC mysql_native_password BY 'password' ; PRIVILÈGES FLUSH ;

La première commande change le mot de passe de l'utilisateur 'root' dans MySQL pour la connexion localhost en 'password'. Cependant, selon la version de MySQL et le plugin d'authentification utilisé, cette commande peut ne pas fonctionner comme prévu.

La deuxième commande change le plugin d'authentification pour l'utilisateur 'root' en 'mysql_native_password' et définit le mot de passe en 'password'. Ceci est nécessaire si le plugin d'authentification est défini sur 'caching_sha2_password', qui est le plugin par défaut pour MySQL 8.0 et les versions ultérieures.

La commande finale 'FLUSH PRIVILEGES' est utilisée pour recharger les tables de droits dans MySQL. Cela garantit que toutes les modifications apportées aux comptes d'utilisateurs sont appliquées immédiatement.

