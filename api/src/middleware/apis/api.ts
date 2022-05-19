import { Router, Request, Response } from 'express'
import { HttpResponse } from '../../presentation/protocols/http'
import { CulculatorController } from '../../presentation/controllers/controller'
import { ok, badRequest } from '../../presentation/helpers/http-helper'
import env from '../../main/config/env'

const router: Router = Router()
const db: { id: string; height: any; width: any; door: any; window: any }[] = []

const makeSut = (): any => {
    const { checkArea, checkDoorAndWindow, doorValidate } = new CulculatorController()

    return {
        checkArea,
        checkDoorAndWindow,
        doorValidate
    }
}

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { checkArea, checkDoorAndWindow, doorValidate } = makeSut()
    const { height, width, door, window } = req.body
    const { totalWall } = await checkArea(height, width)
    const { totalDoorsAndWindows } = await checkDoorAndWindow(door, window)
    const { calculate } = await doorValidate(height)

    const _id = new Date().getTime().toString()
    const schema = {
        id: _id,
        height,
        width,
        door,
        window
    }

    if (db.length > 3) {
        return res.json(badRequest('limite ultrapassado, ja existe 4 paredes cadastradas'))
    }

    const percentage = (50 / 100) * totalWall

    if (totalWall < 1 || totalWall > 15) {
        return res.json(badRequest('a area da parede deve ser de no mínimo 1 metro quadrado e no máximo 15 metros quadrados!'))
    }

    if (calculate < 0.30 && door > 1.90) {
        return res.json(badRequest('altura da porta passou do limite'))
    }

    if (totalDoorsAndWindows > percentage) {
        return res.json(badRequest('total da area das portas e janelas deve ser no maximo 50% da area da parede'))
    }

    if (totalDoorsAndWindows > (totalWall / 2) || totalWall === 0) {
        return res.json(badRequest('quantidade de janelas e portas ultrapassam o limite'))
    }

    db.push(schema)

    return res.json({seccess: 'ok'})
})

router.get('/', async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    if (!db) {
        return res.json(badRequest('db not found'))
    }

    return res.json(ok(db))
})

router.get('/result', async (req: Request, res: Response): Promise<any> => {
    const arrArea: number[] = []
    const arrDoors: number[] = []
    const arrWindows: number[] = []
    let count = 0
    let text = ''

    db.map(itens => {
        const area = (Math.round(itens.height * 100) / 100) * (Math.round(itens.width * 100) / 100)
        arrArea.push(area)

        const doors = itens.door * 1.52
        arrDoors.push(doors)

        const windows = itens.window === 0 ? itens.window : itens.window * 2.4        
        arrWindows.push(windows)
    })

    const reduceWall = arrArea.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })

    const reduceDoors = arrDoors.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })

    const reduceWindows = arrWindows.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })

    let litersNeeded = (reduceWall - (reduceDoors + reduceWindows)) / 5

    env.latas.map(itens => {
        if (litersNeeded >= 0.5) {
            if (litersNeeded >= itens) {
                while (litersNeeded >= itens) {
                    litersNeeded = litersNeeded - itens
                    count++
                }

                if (litersNeeded > 0) {
                    if (count > 1) {
                        text += `${count} lata de ${itens}L, `

                    } else {
                        text += `${count} lata de ${itens}L, `
                    }
                } else {
                    if (count > 1) {
                        text += `${count} lata de ${itens}L, `

                    } else {
                        text += `${count} lata de ${itens}L, `
                    }
                }
            }
        }
    })

    return res.json(ok(text))
})

router.delete('/reset', async (req: Request, res: Response): Promise<any> => {
   while (db.length){
    db.pop()
   }

    return res.json({data: db})
})

export default router
