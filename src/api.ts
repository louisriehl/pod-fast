export default {}

declare global {
    interface Window {
        mainApi: {
            sendPlayers: (players: string[]) => Promise<void>,
            onSendPods: (callback: (_event: any, value: string[][]) => void) => Promise<void>,
            getTableCount: (players: string[]) => Promise<number>,
        },
    }
}
