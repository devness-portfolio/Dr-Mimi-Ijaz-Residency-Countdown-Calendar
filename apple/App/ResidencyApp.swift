import SwiftUI
import WidgetKit
import WebKit

@main
struct ResidencyApp: App {
    @Environment(\.scenePhase) private var scenePhase
    var body: some Scene {
        WindowGroup {
            WebsiteCountdown(active: scenePhase == .active)
                #if os(macOS)
                .frame(minWidth: 360, minHeight: 500)
                #endif
                .onChange(of: scenePhase) { _, phase in
                    if phase == .active { WidgetCenter.shared.reloadAllTimelines() }
                }
        }
        #if os(macOS)
        .defaultSize(width: 820, height: 900)
        #endif
    }
}

// Both apps use the same offline page and shared bunny routine.
private func makeCountdownWebView() -> WKWebView {
    let configuration = WKWebViewConfiguration()
    configuration.websiteDataStore = .nonPersistent()
    if let url = Bundle.main.url(forResource: "doctor-bunny", withExtension: "js"),
       let script = try? String(contentsOf: url, encoding: .utf8) {
        configuration.userContentController.addUserScript(
            WKUserScript(source: script, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
    }
    let view = WKWebView(frame: .zero, configuration: configuration)
    if let page = Bundle.main.url(forResource: "index", withExtension: "html") {
        view.loadFileURL(page, allowingReadAccessTo: page.deletingLastPathComponent())
    }
    return view
}

private func updateActivity(_ view: WKWebView, active: Bool) {
    view.evaluateJavaScript("window.dispatchEvent(new CustomEvent('bunny-app-active', {detail: \(active ? "true" : "false")}))", completionHandler: nil)
}

#if os(macOS)
private struct WebsiteCountdown: NSViewRepresentable {
    let active: Bool
    func makeNSView(context: Context) -> WKWebView { makeCountdownWebView() }
    func updateNSView(_ view: WKWebView, context: Context) { updateActivity(view, active: active) }
}
#else
private struct WebsiteCountdown: UIViewRepresentable {
    let active: Bool
    func makeUIView(context: Context) -> WKWebView { makeCountdownWebView() }
    func updateUIView(_ view: WKWebView, context: Context) { updateActivity(view, active: active) }
}
#endif
