import SwiftUI
import WidgetKit
#if os(macOS)
import WebKit
#endif

@main
struct ResidencyApp: App {
    @Environment(\.scenePhase) private var scenePhase
    var body: some Scene {
        WindowGroup {
            #if os(macOS)
            WebsiteCountdown()
                .frame(minWidth: 360, minHeight: 500)
                .onChange(of: scenePhase) { _, phase in
                    if phase == .active { WidgetCenter.shared.reloadAllTimelines() }
                }
            #else
            ScrollView {
                VStack(spacing: 24) {
                    TimelineView(.periodic(from: .now, by: 60)) { context in
                        CountdownCard(state: Countdown(date: context.date), expanded: true)
                            .padding(24)
                            .background(.white.opacity(0.65), in: RoundedRectangle(cornerRadius: 28))
                    }
                    Text("A little love, every day.").font(.system(.title3, design: .serif))
                    Text("Add Residency Countdown from your device’s widget gallery to keep the countdown close.")
                        .font(.subheadline).multilineTextAlignment(.center)
                    Link("Open the full countdown", destination: Residency.website).foregroundStyle(Palette.pink)
                }
                .foregroundStyle(Palette.ink)
                .padding(24).frame(maxWidth: 540).frame(maxWidth: .infinity)
            }
            .background(Palette.background)
            .onChange(of: scenePhase) { _, phase in
                if phase == .active { WidgetCenter.shared.reloadAllTimelines() }
            }
            #endif
        }
        #if os(macOS)
        .defaultSize(width: 820, height: 900)
        #endif
    }
}

#if os(macOS)
// Load the same files served to iPhone browsers, bundled for offline use.
private struct WebsiteCountdown: NSViewRepresentable {
    func makeNSView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .nonPersistent()
        let webView = WKWebView(frame: .zero, configuration: configuration)
        if let page = Bundle.main.url(forResource: "index", withExtension: "html") {
            webView.loadFileURL(page, allowingReadAccessTo: page.deletingLastPathComponent())
        }
        return webView
    }

    func updateNSView(_ webView: WKWebView, context: Context) {}
}
#endif
