"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Shield, CheckCircle, Download, Eye } from "lucide-react"

const electionResults = [
  { candidate: "Alice Johnson", party: "Progressive Party", votes: 342, percentage: 38.3 },
  { candidate: "Bob Smith", party: "Conservative Alliance", votes: 298, percentage: 33.4 },
  { candidate: "Carol Davis", party: "Independent", votes: 252, percentage: 28.3 },
]

const cryptographicProofs = [
  {
    type: "Homomorphic Tally Verification",
    status: "Verified",
    hash: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    description: "Proves that vote tallying was performed correctly without revealing individual votes",
  },
  {
    type: "Zero-Knowledge Eligibility Proof",
    status: "Verified",
    hash: "0x6e8a1b7c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    description: "Confirms all voters were eligible without revealing voter identities",
  },
  {
    type: "Ring Signature Validation",
    status: "Verified",
    hash: "0x5d7a0b6c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    description: "Validates vote authenticity while maintaining complete anonymity",
  },
  {
    type: "Blockchain Integrity Check",
    status: "Verified",
    hash: "0x4c6a9b5c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
    description: "Ensures no votes were tampered with or double-counted",
  },
]

export function ResultsDisplay() {
  const [showProofs, setShowProofs] = useState(false)
  const totalVotes = electionResults.reduce((sum, result) => sum + result.votes, 0)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Election Results</h2>
            <p className="text-muted-foreground">Cryptographically verified results with complete voter anonymity</p>
          </div>
          <Badge variant="secondary" className="text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Final Results
              </CardTitle>
              <CardDescription>Total votes cast: {totalVotes.toLocaleString()} | Turnout: 71.5%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {electionResults.map((result, index) => (
                <div key={result.candidate} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{result.candidate}</h3>
                      <p className="text-sm text-muted-foreground">{result.party}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{result.votes.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{result.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={result.percentage} className="h-3" />
                  {index === 0 && (
                    <Badge variant="default" className="mt-2">
                      Winner
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              These results were computed using homomorphic encryption, ensuring that individual votes remained private
              throughout the entire tallying process. The cryptographic proofs below verify the integrity of this
              election.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Results
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              View Raw Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cryptographic Verification
              </CardTitle>
              <CardDescription>Mathematical proofs ensuring election integrity and voter privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cryptographicProofs.map((proof, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{proof.type}</h4>
                    <Badge variant="secondary" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {proof.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{proof.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Proof Hash:</span>
                    <span className="font-mono">{proof.hash.substring(0, 20)}...</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Homomorphic Tallying</h4>
                    <p className="text-sm text-muted-foreground">
                      Votes were counted using homomorphic encryption, allowing mathematical operations on encrypted
                      data without decryption.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Zero-Knowledge Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Each vote's validity was proven without revealing the voter's identity or choice using
                      zero-knowledge proofs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Blockchain Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      All votes were recorded on an immutable blockchain, ensuring transparency and preventing
                      tampering.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Election Audit Trail</CardTitle>
              <CardDescription>Complete chronological record of all election activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Election Started</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 08:00:00 UTC</p>
                  </div>
                  <Badge variant="outline">System Event</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">First Vote Cast</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 08:15:23 UTC</p>
                  </div>
                  <Badge variant="secondary">Vote Event</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Peak Voting Period</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 12:00-14:00 UTC</p>
                  </div>
                  <Badge variant="outline">Analytics</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Election Ended</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 20:00:00 UTC</p>
                  </div>
                  <Badge variant="outline">System Event</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Homomorphic Tallying Completed</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 20:05:42 UTC</p>
                  </div>
                  <Badge variant="default">Tally Event</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Results Published</span>
                    <p className="text-sm text-muted-foreground">2024-01-15 20:10:15 UTC</p>
                  </div>
                  <Badge variant="default">Publication</Badge>
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  All audit events are cryptographically signed and stored on the blockchain for permanent verification.
                  No events can be modified or deleted after recording.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistical Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Registered Voters</span>
                    <span className="font-mono">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Votes Successfully Cast</span>
                    <span className="font-mono">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voter Turnout Rate</span>
                    <span className="font-mono">71.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Invalid/Rejected Votes</span>
                    <span className="font-mono">0</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Blockchain Blocks Created</span>
                    <span className="font-mono">1,024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cryptographic Proofs Generated</span>
                    <span className="font-mono">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Vote Processing Time</span>
                    <span className="font-mono">2.3s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Consensus Achieved</span>
                    <span className="font-mono">100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
