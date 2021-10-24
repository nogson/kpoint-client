import * as PIXI from 'pixi.js'

type LoaderResult = Partial<Record<string, PIXI.LoaderResource>>
type ImgAssetPath = [string, string]

export const loadImages = (imagesPath: ImgAssetPath[]): Promise<LoaderResult> => {
    const loader = new PIXI.Loader()
    imagesPath.forEach(path => loader.add(...path))
    const promise = new Promise<LoaderResult>(resolve => {
        loader.load((loader, resources) => {
            resolve(resources)
        })
    })
    return promise
}
