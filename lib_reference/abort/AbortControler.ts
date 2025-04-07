export class AbortController {
    signal: EventTarget = new EventTarget();
    aborted: boolean = false
    abort() {
        if (this.aborted) return
        this.signal.dispatchEvent(new Event('abort'));
        this.aborted = true
    }
}