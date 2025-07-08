"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Settings, Users, BarChart3, Shield, Play, Square, RefreshCw } from "lucide-react"

export function AdminDashboard() {
  const [electionStatus, setElectionStatus] = useState<"setup" | "active" | "ended">("setup")
  const [isProcessing, setIsProcessing] = useState(false)

  const startElection = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setElectionStatus("active")
    setIsProcessing(false)
  }

  const endElection = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setElectionStatus("ended")
    setIsProcessing(false)
  }

  const tallyVotes = async () => {
    setIsProcessing(true)
    // Simulate homomorphic tallying
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Election Administration</h2>
            <p className="text-muted-foreground">Manage the privacy-preserving voting system</p>
          </div>
          <Badge
            variant={electionStatus === "active" ? "default" : electionStatus === "ended" ? "secondary" : "outline"}
          >
            {electionStatus === "setup" ? "Setup" : electionStatus === "active" ? "Active" : "Ended"}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="control" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="tallying">Tallying</TabsTrigger>
        </TabsList>

        <TabsContent value="control" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Election Control
              </CardTitle>
              <CardDescription>Start, stop, and manage the election process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={startElection}
                  disabled={electionStatus !== "setup" || isProcessing}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isProcessing && electionStatus === "setup" ? "Starting..." : "Start Election"}
                </Button>

                <Button
                  onClick={endElection}
                  disabled={electionStatus !== "active" || isProcessing}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Square className="h-4 w-4" />
                  {isProcessing && electionStatus === "active" ? "Ending..." : "End Election"}
                </Button>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All election state changes are recorded on the blockchain for transparency and auditability.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Election Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="electionName">Election Name</Label>
                  <Input id="electionName" defaultValue="2024 Presidential Election" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input id="duration" type="number" defaultValue="24" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  defaultValue="Privacy-preserving presidential election using advanced cryptography"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Registered voters</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">71.5% turnout</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blockchain Height</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <p className="text-xs text-muted-foreground">Blocks mined</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Voting Activity</CardTitle>
              <CardDescription>Anonymous voting patterns (no individual identification)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Voting Rate</span>
                  <span className="font-mono">37 votes/hour</span>
                </div>
                <Progress value={71.5} className="w-full" />
                <p className="text-sm text-muted-foreground">71.5% of registered voters have participated</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cryptographic Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Encryption Strength</span>
                    <Badge variant="secondary">256-bit</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Zero-Knowledge Proofs</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Ring Signatures</span>
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Homomorphic Encryption</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Blockchain Integrity</span>
                    <Badge variant="secondary">Valid</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Consensus Algorithm</span>
                    <Badge variant="secondary">PoS</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Nodes</span>
                    <Badge variant="secondary">127</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Hash Rate</span>
                    <Badge variant="secondary">High</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Last security scan</span>
                  <span className="text-muted-foreground">2 minutes ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Cryptographic verification</span>
                  <span className="text-green-600">Passed</span>
                </div>
                <div className="flex justify-between">
                  <span>Blockchain integrity check</span>
                  <span className="text-green-600">Valid</span>
                </div>
                <div className="flex justify-between">
                  <span>Anonymous vote validation</span>
                  <span className="text-green-600">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tallying" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homomorphic Vote Tallying</CardTitle>
              <CardDescription>Count votes without decrypting individual ballots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Homomorphic encryption allows mathematical operations on encrypted votes, enabling tallying without
                  revealing individual choices.
                </AlertDescription>
              </Alert>

              <Button onClick={tallyVotes} disabled={electionStatus !== "ended" || isProcessing} className="w-full">
                {isProcessing ? "Computing Homomorphic Tally..." : "Start Homomorphic Tallying"}
              </Button>

              {electionStatus === "ended" && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Tallying Process:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>1. Collect all encrypted votes from blockchain</li>
                      <li>2. Apply homomorphic addition to encrypted ballots</li>
                      <li>3. Decrypt only the final aggregated result</li>
                      <li>4. Verify result using zero-knowledge proofs</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">342</div>
                      <div className="text-sm text-muted-foreground">Alice Johnson</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">298</div>
                      <div className="text-sm text-muted-foreground">Bob Smith</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">252</div>
                      <div className="text-sm text-muted-foreground">Carol Davis</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
