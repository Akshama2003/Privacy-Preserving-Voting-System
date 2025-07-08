"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BlocksIcon as Block, Hash, Clock, Shield } from "lucide-react"

const mockBlocks = [
  {
    height: 1024,
    hash: "0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    timestamp: "2024-01-15 14:30:25",
    transactions: 15,
    votes: 12,
    validator: "Node-127",
  },
  {
    height: 1023,
    hash: "0x6e8a1b7c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    timestamp: "2024-01-15 14:25:18",
    transactions: 18,
    votes: 15,
    validator: "Node-089",
  },
  {
    height: 1022,
    hash: "0x5d7a0b6c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    timestamp: "2024-01-15 14:20:12",
    transactions: 22,
    votes: 18,
    validator: "Node-156",
  },
]

const mockTransactions = [
  {
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    type: "Vote",
    blockHeight: 1024,
    timestamp: "2024-01-15 14:30:25",
    status: "Confirmed",
    ringSignature: "ring_abc123def456",
    zkProof: "zk_789xyz012abc",
  },
  {
    hash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
    type: "Vote",
    blockHeight: 1024,
    timestamp: "2024-01-15 14:29:18",
    status: "Confirmed",
    ringSignature: "ring_def456ghi789",
    zkProof: "zk_012abc345def",
  },
  {
    hash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
    type: "Registration",
    blockHeight: 1023,
    timestamp: "2024-01-15 14:25:45",
    status: "Confirmed",
    ringSignature: "N/A",
    zkProof: "zk_345def678ghi",
  },
]

export function BlockchainExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Blockchain Explorer</h2>
        <p className="text-muted-foreground">Explore the transparent, immutable record of all voting activities</p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search by block height, transaction hash, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="blocks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="space-y-4">
          <div className="grid gap-4">
            {mockBlocks.map((block) => (
              <Card key={block.height} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Block className="h-5 w-5 text-blue-500" />
                        <span className="font-bold text-lg">#{block.height}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="h-3 w-3" />
                          <span className="font-mono text-xs">{block.hash.substring(0, 20)}...</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{block.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex gap-2">
                        <Badge variant="outline">{block.transactions} txns</Badge>
                        <Badge variant="secondary">{block.votes} votes</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Validator: {block.validator}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4">
            {mockTransactions.map((tx) => (
              <Card key={tx.hash}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={tx.type === "Vote" ? "default" : "secondary"}>{tx.type}</Badge>
                        <span className="font-mono text-sm">{tx.hash.substring(0, 20)}...</span>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {tx.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Block Height:</span>
                        <span className="ml-2 font-mono">#{tx.blockHeight}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <span className="ml-2">{tx.timestamp}</span>
                      </div>
                    </div>

                    {tx.type === "Vote" && (
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-3 w-3" />
                          <span className="text-muted-foreground">Ring Signature:</span>
                          <span className="font-mono text-xs">{tx.ringSignature}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-3 w-3" />
                          <span className="text-muted-foreground">ZK Proof:</span>
                          <span className="font-mono text-xs">{tx.zkProof}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
                <Block className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <p className="text-xs text-muted-foreground">+12 in last hour</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vote Transactions</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">All cryptographically verified</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Nodes</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">Distributed validators</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Block Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2s</div>
                <p className="text-xs text-muted-foreground">Average confirmation time</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Network Health</CardTitle>
              <CardDescription>Real-time network statistics and performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Network Hash Rate</span>
                    <span className="font-mono">2.4 TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consensus Participation</span>
                    <span className="font-mono">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Throughput</span>
                    <span className="font-mono">45 TPS</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Network Latency</span>
                    <span className="font-mono">127ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Efficiency</span>
                    <span className="font-mono">89.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cryptographic Overhead</span>
                    <span className="font-mono">12.3%</span>
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
