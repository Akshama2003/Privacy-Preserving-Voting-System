"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoterRegistration } from "@/components/voter-registration"
import { VotingInterface } from "@/components/voting-interface"
import { AdminDashboard } from "@/components/admin-dashboard"
import { BlockchainExplorer } from "@/components/blockchain-explorer"
import { ResultsDisplay } from "@/components/results-display"
import { Shield, Vote, Users, BarChart3 } from "lucide-react"

export default function PrivacyVotingSystem() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy-Preserving Voting System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A secure electronic voting system utilizing cryptographic techniques and blockchain technology to ensure
            voter anonymity, ballot secrecy, and verifiable results.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="vote">Vote</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Voters</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last election</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
                  <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground">71.5% turnout rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Level</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">256-bit</div>
                  <p className="text-xs text-muted-foreground">Cryptographic strength</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blockchain Blocks</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,024</div>
                  <p className="text-xs text-muted-foreground">All votes recorded</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cryptographic Features</CardTitle>
                  <CardDescription>Advanced techniques ensuring privacy and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Zero-Knowledge Proofs</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Homomorphic Encryption</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ring Signatures</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commitment Schemes</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Guarantees</CardTitle>
                  <CardDescription>What this system protects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Voter Anonymity</h4>
                    <p className="text-sm text-muted-foreground">
                      Individual votes cannot be linked to specific voters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Ballot Secrecy</h4>
                    <p className="text-sm text-muted-foreground">Vote contents remain encrypted until tallying</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Verifiable Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Anyone can verify the election outcome without seeing individual votes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <VoterRegistration />
          </TabsContent>

          <TabsContent value="vote" className="mt-6">
            <VotingInterface />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6">
            <BlockchainExplorer />
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <ResultsDisplay />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
