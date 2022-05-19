export class CulculatorController {
  async checkArea (height: number, width: number): Promise<any> {
    const totalWall = (Math.round(height * 100) / 100) * (Math.round(width * 100) / 100)

    return { totalWall }
  }

  async checkDoorAndWindow (door: number, window: number): Promise<any> {
    const doors = 1.90 * door
    const windows = 2.00 * window

    const totalDoorsAndWindows = doors + windows
    return {totalDoorsAndWindows}
  }

  async doorValidate (wallHeight: number): Promise<any> {
    const calculate = wallHeight - 1.90

    return {calculate}
  }
}
