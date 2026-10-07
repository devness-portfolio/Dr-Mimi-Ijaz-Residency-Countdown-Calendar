import Foundation
for zoneName in ["America/Chicago", "America/New_York", "UTC", "Asia/Karachi"] {
    let zone = TimeZone(identifier: zoneName)!
    let dates = Residency.milestones(timeZone: zone)
    let start = Countdown(date: dates.start, timeZone: zone)
    assert(start.progress == 0 && !start.complete)
    assert(Countdown(date: dates.start.addingTimeInterval(-86400), timeZone: zone).progress == 0)
    let lastSecond = Countdown(date: dates.end.addingTimeInterval(-1), timeZone: zone)
    assert(lastSecond.days == 1 && !lastSecond.complete && lastSecond.percentage == "99.9% complete")
    for offset in [0.0, 1.0, 86400.0] {
        let finished = Countdown(date: dates.end.addingTimeInterval(offset), timeZone: zone)
        assert(finished.complete && finished.days == 0 && finished.progress == 1)
    }
    let boundary = dates.end.addingTimeInterval(-86400 * 3)
    assert(Countdown(date: boundary.addingTimeInterval(-1), timeZone: zone).days == 4)
    assert(Countdown(date: boundary, timeZone: zone).days == 3)
    let timeline = Countdown.refreshDates(after: boundary.addingTimeInterval(-1), timeZone: zone)
    assert(timeline.first == boundary && timeline.last == dates.end)
    assert(Countdown.refreshDates(after: dates.end, timeZone: zone).isEmpty)
    var calendar = Calendar(identifier: .gregorian)
    calendar.timeZone = zone
    for day in [7, 8, 9] {
        let date = calendar.date(from: DateComponents(year: 2027, month: 3, day: day, hour: 12))!
        let state = Countdown(date: date, timeZone: zone)
        let next = Countdown.refreshDates(after: date, timeZone: zone).first!
        assert(next > date && next.timeIntervalSince(date) <= 86400)
        assert(Countdown(date: next, timeZone: zone).days == state.days - 1)
    }
}
print("Countdown boundary, completion, timezone, DST, progress, and timeline checks passed.")

let sample = Date(timeIntervalSince1970: 1791345600)
let poses = (0..<40).map { BunnyActivity.at(sample.addingTimeInterval(Double($0) * 1800), complete: false) }
assert(Set(poses) == Set(BunnyActivity.allCases))
assert(poses.filter { $0 == .rest }.count == 20)
assert(BunnyActivity.at(sample, complete: true) == .celebrate)
let poseDates = BunnyActivity.refreshDates(after: sample)
assert(poseDates == poseDates.sorted() && Set(poseDates).count == poseDates.count)
assert(poseDates.allSatisfy { $0 > sample })
assert(poseDates.first!.timeIntervalSince(sample) <= 1800)
let completion = Residency.milestones().end
assert(BunnyActivity.refreshDates(after: completion.addingTimeInterval(-1)).contains(completion))
print("Bunny pose rotation, resting intervals, completion and timeline ordering checks passed.")
