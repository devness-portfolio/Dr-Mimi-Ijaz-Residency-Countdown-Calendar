import SwiftUI

enum Palette {
    static let ink = Color(red: 0.396, green: 0.314, blue: 0.388)
    static let pink = Color(red: 0.741, green: 0.404, blue: 0.553)
    static let background = LinearGradient(colors: [Color(red: 1, green: 0.973, blue: 0.953), Color(red: 0.949, green: 0.925, blue: 0.973)], startPoint: .topLeading, endPoint: .bottomTrailing)
}

struct CountdownCard: View {
    let state: Countdown
    var compact = false
    var expanded = false
    var body: some View {
        VStack(alignment: .leading, spacing: expanded ? 10 : 4) {
            HStack {
                Text("Dr. Mimi Ijaz").font(.system(.headline, design: .rounded))
                Spacer(minLength: 2)
                Image(systemName: state.complete ? "star.fill" : "heart.fill")
                    .foregroundStyle(Palette.pink).accessibilityHidden(true)
            }
            if state.complete {
                Text("YOU DID IT!")
                    .font(.system(size: compact ? 24 : 32, weight: .bold, design: .serif))
                    .foregroundStyle(Palette.pink).minimumScaleFactor(0.7).lineLimit(1)
                Text("Congratulations Meri Jaan!!")
                    .font(.system(compact ? .caption : .subheadline, design: .rounded))
                Text("Alhamdulillah").font(.subheadline)
                if expanded { verse }
            } else {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text(state.days.formatted())
                        .font(.system(size: compact ? 48 : (expanded ? 58 : 44), weight: .regular, design: .serif))
                        .monospacedDigit().foregroundStyle(Palette.pink)
                        .minimumScaleFactor(0.6).lineLimit(1)
                    if !compact { Text("days left").font(.title3) }
                }
                if compact { Text("days left").font(.subheadline) }
                if !compact { Text("One day closer, meri jaan.").font(.subheadline) }
                ProgressView(value: state.progress).tint(Palette.pink)
                    .accessibilityLabel("Residency progress").accessibilityValue(state.percentage)
                if !compact { Text(state.percentage).font(.caption) }
                if expanded {
                    Spacer(minLength: 8)
                    Text("Every day, a little closer to your dream.").font(.system(.title3, design: .serif))
                    Text(state.end, format: .dateTime.month(.wide).day().year()).font(.subheadline)
                }
            }
        }
        .foregroundStyle(Palette.ink)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }
    private var verse: some View {
        VStack(spacing: 8) {
            Text("فَإِنَّ مَعَ الْعُسْرِ يُسْرًا").font(.title2)
                .environment(\.layoutDirection, .rightToLeft)
                .environment(\.locale, Locale(identifier: "ar"))
            Text("Verily, with hardship comes ease.").font(.subheadline)
            Text("Qur'an 94:5 — Ash-Sharh").font(.caption)
        }
        .multilineTextAlignment(.center).frame(maxWidth: .infinity).padding(.top, 12)
    }
}
