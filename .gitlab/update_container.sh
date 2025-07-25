#!/usr/bin/env bash

# Arrête le script immédiatement si une commande échoue.
set -e
set -o pipefail

# --- VARIABLES REQUISES ---
# BUNNYNET_ACCESS_KEY : Votre clé d'accès au compte Bunny.net.
# APPLICATION_ID      : L'ID de votre application Magic Containers.
# CONTAINER_NAME      : Le nom du conteneur spécifique à mettre à jour (ex: "app").
# DOCKER_IMAGE_TAG    : Le nouveau tag de l'image (ex: le SHA du commit).
# --------------------------

echo "1. Récupération du token d'accès Bunny.net..."
# **CORRECTION APPLIQUÉE ICI** : Le corps --data a été restauré, comme dans votre script original.
export BUNNYNET_ACCESS_TOKEN=$(curl \
    --request POST \
    --header "AccessKey: $BUNNYNET_ACCESS_KEY" \
    --header "Content-Type: application/json" \
    --data "{\"AccessKey\":\"$BUNNYNET_ACCESS_KEY\"}" \
    --silent \
    https://api.bunny.net/apikey/exchange | jq --raw-output .Token)

# Vérifie que le token a bien été obtenu
if [ -z "$BUNNYNET_ACCESS_TOKEN" ] || [ "$BUNNYNET_ACCESS_TOKEN" == "null" ]; then
    echo "Erreur : Impossible d'obtenir le token d'accès. Vérifiez votre BUNNYNET_ACCESS_KEY." >&2
    exit 1
fi

echo "2. Récupération de la configuration de l'application Magic Containers..."
export MAGIC_CONTAINER_APP_CONFIG=$(curl \
    --request GET \
    --header 'Accept: application/json' \
    --header "Authorization: $BUNNYNET_ACCESS_TOKEN" \
    --silent \
    "https://api-mc.opsbunny.net/v1/namespaces/default/applications/$APPLICATION_ID/configuration")

echo "3. Mise à jour de la configuration en mémoire avec le nouveau tag d'image..."
export UPDATED_CONFIG=$(echo "$MAGIC_CONTAINER_APP_CONFIG" | jq \
    --arg CONTAINER "$CONTAINER_NAME" \
    --arg TAG "$DOCKER_IMAGE_TAG" \
    '(.containerTemplates[] | select(.name == $CONTAINER)) |= (.imageTag = $TAG | del(.imageDigest))')

echo "4. Envoi de la configuration mise à jour à Bunny.net..."
echo "$UPDATED_CONFIG" | curl \
    --request PUT \
    --header "Authorization: $BUNNYNET_ACCESS_TOKEN" \
    --header 'Content-Type: application/json' \
    --data @- \
    --silent \
    --fail \
    https://api-mc.opsbunny.net/v1/namespaces/default/applications

echo "Mise à jour du conteneur '$CONTAINER_NAME' avec l'image '$DOCKER_IMAGE_TAG' terminée avec succès."