# C7t K8s Pres

A presentation given to fellow frontend engineers about how learning Kubernetes can make you a better ~~frontend~~ developer.

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
