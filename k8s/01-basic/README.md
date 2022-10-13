# Basic Kubernetes Resources

Kubernetes resources are YAML files.
They can be structured however we wish, as long as we end up providing each of their contents to k8s.

A few examples could be:

**Subfolders per service, but individual YAML files**

* `frontend/`
  * `deployment.yaml`
  * `route.yaml`
  * `service.yaml`
* `backend/`
    * `deployment.yaml`
    * `route.yaml`
    * `service.yaml`

**Flat file structure, individual YAML files**

* `deployment.backend.yaml`
* `deployment.frontend.yaml`
* `route.backend.yaml`
* `route.frontend.yaml`
* `service.backend.yaml`
* `service.frontend.yaml`

**One file per service**

* `frontend.yaml`
* `backend.yaml`

In this case, all resources required to run a specific service are bundled into a single YAML file, with each
being represented by a different YAML "document" (separated by `---` as per the YAML spec).

Here is an example `frontend.yaml`:

```yaml
kind: Deployment
metadata:
  ...
spec:
  ...
---
kind: Service
metadata:
  ...
spec:
  ...
---
kind: Route
metadata:
  ...
spec:
  ...
---
```
