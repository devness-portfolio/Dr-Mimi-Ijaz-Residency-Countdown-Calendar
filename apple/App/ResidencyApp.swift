import SwiftUI
import WidgetKit

@main
struct ResidencyApp: App {
    @Environment(\.scenePhase) private var scenePhase
    var body: some Scene {
        WindowGroup {
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
        }
    }
}
