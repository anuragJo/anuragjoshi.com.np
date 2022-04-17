// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.
const { Scene, GLRenderer, Vec3, Color, Xfo, Quat, GeomItem, Sphere, Material, Ray, MathFunctions } = window.zeaEngine

export function main() {
  // create a new scene
  const scene = new Scene()

  // create a new renderer and attach it to our HTML Canvas
  const renderer = new GLRenderer(document.getElementById('canvas'))

  // attach the scene to the renderer. Anything attached to this scene will now be rendererd.
  renderer.setScene(scene)

  // get the camera from renderer
  const camera = renderer.getViewport().getCamera()
  // set camera's target and position.
  camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

  // create a grid
  scene.setupGrid(100, 100)
}