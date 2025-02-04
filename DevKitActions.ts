'use server';

import { DevKitModel, type IDevKit } from '@/models/DevKit';

export async function createDevKit(data: IDevKit) {
    try {
        const devKit = await DevKitModel.create(data);
        return devKit;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateDevKit(id: string, data: IDevKit) {
    try {
        const devKit = await DevKitModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
        return devKit;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteDevKit(id: string) {
    try {
        const devKit = await DevKitModel.findByIdAndDelete(id);
        return devKit;
    } catch (error) {
        console.log(error);
        return null;
    }
}