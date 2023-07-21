export default {}

declare global {
    interface Window {
        mainApi: {
            sendPlayers: (players: string[]) => Promise<void>,
        },
    }
}
