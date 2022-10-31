# C7t K8s Pres

A presentation given to fellow frontend engineers about how learning Kubernetes can make you a better ~~frontend~~ developer.

## Presentation

Presentation slides are available: http://peter.serwylo.com/cognizant-k8s-pres.

### Details of post-presentation demos

The presentation tries to describe why you may wish to use k8s from first principles, but doesn't explain what k8s is
or how it is used. To showcase this, a demo is really required. Hence, once the end of the presentation was reached, I did the following to build up an intuition about some of the concepts in k8s:
* Log into OpenShift and show a full deployment of the frontend + backend from `./k8s/04-health-checks`.
* Remove the deployment to make space to start from first principles:
  * `kubectl delete all --all`
* Create silly pods to showcase the simplest (and silliest) deployment in k8s:
  * `kubectl find ./k8s/00-building-blocks/ -iname "*.yaml" | xargs yq | kubectl apply -f -`
* Remove the pods to make space for proper Deployment + Service version:
  * `kubectl delete all --all`
* Showcase how a [deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) is a better way to manage containers:
  * `kubectl apply -f ./k8s/01-basic/frontend/deployment.yaml`
* Explain that [services](https://kubernetes.io/docs/concepts/services-networking/service/) are required to route traffic to a collection of pods:
  * `kubectl apply -f ./k8s/01-basic/frontend/service.yaml`
* Open up traffic to the world using an (OpenShift specific) route:
  * `kubectl apply -f ./k8s/01-basic/frontend/route.yaml`
* After viewing a misconfigured app, move on to explain how [config maps](https://kubernetes.io/docs/concepts/configuration/configmap/) are used to provide per-environment configuration, and then how to mount the configmap into the deployment. Note that after updating the deployment, a rolling restart is performed:
  * `kubectl apply -f ./k8s/02-configmap/frontend/configmap.yaml`
  * `kubectl apply -f ./k8s/02-configmap/frontend/deployment.yaml`
* Showcase resource limits:
  * `find ./k8s/03-limits/ -iname "*.yaml" | xargs yq | kubectl apply -f -`
* Explain the need for health checks:
  * `find ./k8s/04-health-checks/ -iname "*.yaml" | xargs yq | kubectl apply -f -`
* Remove the manually created resources, then run a helm install to show one approach to managing a collection of k8s resources:
  * `kubectl delete all --all`
  * `helm install app ./k8s/05-helm`

## Organisation of this repo

### Example app (`frontend/` + `backend/`)

Two basic apps used to in the presentation to illustrate some basic concepts of deploying containers.
The frontend is based on create-react-app and the backend is created using express.

These are built into docker images available at [pserwylo/cognizant-k8s-pres-frontend:latest](https://hub.docker.com/r/pserwylo/cognizant-k8s-pres-frontend)
and [pserwylo/cognizant-k8s-pres-backend:latest](https://hub.docker.com/r/pserwylo/cognizant-k8s-pres-backend) respectively.

### Presentation (`presentation/`)

The slide deck used to present this material is available at: http://peter.serwylo.com/cognizant-k8s-pres.

### Example kubernetes config (`k8s/`)

Starting from basic principles, through to (slightly) more complex topics such as deployments, configmaps, resource
limits, etc.

There is also a bunch of `0x-` folders that are empty, only present to highlight that we could continue to show more
and more of the complex beast that is k8s if we chose.

### Docs (`docs/`)

Toy, non-functioning examples used to generate screenshots for the presentation.
