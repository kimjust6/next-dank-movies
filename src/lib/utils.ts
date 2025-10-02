import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateShortUUID(length = 15) {
    return [...Array(length)]
        .map(() => Math.random().toString(36)[2]) // random a-z0-9
        .join('')
}
