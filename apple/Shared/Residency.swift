import Foundation

enum Residency {
    // Match the website: midnight in the device's current timezone.
    static func milestones(timeZone: TimeZone = .current) -> (start: Date, end: Date) {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        return (calendar.date(from: DateComponents(year: 2022, month: 7, day: 1))!,
                calendar.date(from: DateComponents(year: 2027, month: 7, day: 1))!)
    }
    static let website = URL(string: "https://devness-portfolio.github.io/Dr-Mimi-Ijaz-Residency-Countdown-Calendar/")!
}

struct Countdown {
    let date: Date
    let end: Date
    let days: Int
    let progress: Double
    var complete: Bool { date >= end }
    var percentage: String { String(format: "%.1f%% complete", floor(progress * 1000) / 10) }
    init(date: Date, timeZone: TimeZone = .current) {
        let milestones = Residency.milestones(timeZone: timeZone)
        self.date = date
        end = milestones.end
        days = Int(ceil(max(0, end.timeIntervalSince(date)) / 86400))
        progress = min(1, max(0, date.timeIntervalSince(milestones.start) / end.timeIntervalSince(milestones.start)))
    }
    // Elapsed 24-hour boundaries match ceil(days) across DST. Include completion.
    static func refreshDates(after date: Date, timeZone: TimeZone = .current) -> [Date] {
        let state = Countdown(date: date, timeZone: timeZone)
        guard !state.complete else { return [] }
        let next = state.end.addingTimeInterval(-Double(state.days - 1) * 86400)
        return (0..<8).map { next.addingTimeInterval(Double($0) * 86400) }.filter { $0 <= state.end }
    }
}
