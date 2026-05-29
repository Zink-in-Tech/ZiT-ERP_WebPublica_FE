import Foundation
import AVFoundation

struct Job {
  let source: String
  let output: String
}

let jobs: [Job] = [
  .init(
    source: "/Users/fernandodemaio/Documents/tutos_erp/venta_pos.mov",
    output: "/Users/fernandodemaio/Documents/GitHub/ZiT-ERP_WebPublica_FE/public/img/product-motion/venta-pos.mp4"
  ),
  .init(
    source: "/Users/fernandodemaio/Documents/tutos_erp/toma_inventario.mov",
    output: "/Users/fernandodemaio/Documents/GitHub/ZiT-ERP_WebPublica_FE/public/img/product-motion/toma-inventario.mp4"
  ),
  .init(
    source: "/Users/fernandodemaio/Documents/tutos_erp/venta_Comercial.mov",
    output: "/Users/fernandodemaio/Documents/GitHub/ZiT-ERP_WebPublica_FE/public/img/product-motion/venta-comercial.mp4"
  ),
  .init(
    source: "/Users/fernandodemaio/Documents/tutos_erp/Dashboard_base.mov",
    output: "/Users/fernandodemaio/Documents/GitHub/ZiT-ERP_WebPublica_FE/public/img/product-motion/dashboard-base.mp4"
  ),
]

let fileManager = FileManager.default
let presetCandidates = [
  AVAssetExportPreset1280x720,
  AVAssetExportPreset960x540,
  AVAssetExportPresetMediumQuality,
]

func export(job: Job) throws {
  let sourceURL = URL(fileURLWithPath: job.source)
  let outputURL = URL(fileURLWithPath: job.output)

  guard fileManager.fileExists(atPath: sourceURL.path) else {
    throw NSError(domain: "Transcode", code: 1, userInfo: [NSLocalizedDescriptionKey: "Missing source: \(job.source)"])
  }

  try? fileManager.removeItem(at: outputURL)
  try fileManager.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)

  let asset = AVURLAsset(url: sourceURL)
  let compatible = AVAssetExportSession.exportPresets(compatibleWith: asset)
  guard let preset = presetCandidates.first(where: { compatible.contains($0) }) else {
    throw NSError(domain: "Transcode", code: 2, userInfo: [NSLocalizedDescriptionKey: "No compatible preset for \(job.source)"])
  }

  guard let session = AVAssetExportSession(asset: asset, presetName: preset) else {
    throw NSError(domain: "Transcode", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not create export session for \(job.source)"])
  }

  session.outputURL = outputURL
  session.outputFileType = .mp4
  session.shouldOptimizeForNetworkUse = true

  let semaphore = DispatchSemaphore(value: 0)
  session.exportAsynchronously {
    semaphore.signal()
  }
  semaphore.wait()

  if let error = session.error {
    throw error
  }

  guard session.status == .completed else {
    throw NSError(domain: "Transcode", code: 4, userInfo: [NSLocalizedDescriptionKey: "Export failed for \(job.source) with status \(session.status.rawValue)"])
  }
}

do {
  for job in jobs {
    try export(job: job)
    print("OK \(job.output)")
  }
} catch {
  fputs("ERROR: \(error.localizedDescription)\n", stderr)
  exit(1)
}
