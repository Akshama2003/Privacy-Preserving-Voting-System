"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Vote, Shield, Lock, CheckCircle } from "lucide-react"

const candidates = [
  { id: "alice", name: "Alice Johnson", party: "Progressive Party" },
  { id: "bob", name: "Bob Smith", party: "Conservative Alliance" },
  { id: "carol", name: "Carol Davis", party: "Independent" },
]

export function VotingInterface() {
  const [step, setStep] = useState(1)
  const [privateKey, setPrivateKey] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState("")
  const [encryptedVote, setEncryptedVote] = useState("")
  const [ringSignature, setRingSignature] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [voteSubmitted, setVoteSubmitted] = useState(false)

  const authenticateVoter = async () => {
    setIsProcessing(true)
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    setStep(2)
  }

  const encryptVote = async () => {
    setIsProcessing(true)
    // Simulate vote encryption and ring signature generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setEncryptedVote("enc_" + Math.random().toString(36).substring(2, 15))
    setRingSignature("ring_" + Math.random().toString(36).substring(2, 15))
    setIsProcessing(false)
    setStep(3)
  }

  const submitVote = async () => {
    setIsProcessing(true)
    // Simulate blockchain submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setVoteSubmitted(true)
    setStep(4)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Cast Your Vote
          </CardTitle>
          <CardDescription>Vote anonymously using cryptographic protection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={(step / 4) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Authenticate</span>
              <span>Select</span>
              <span>Encrypt</span>
              <span>Submit</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Enter your private key to authenticate. Your identity will remain anonymous through zero-knowledge
                  proofs.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="privateKey">Private Key</Label>
                <Input
                  id="privateKey"
                  type="password"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter your private key"
                  required
                />
              </div>

              <Button onClick={authenticateVoter} className="w-full" disabled={!privateKey || isProcessing}>
                {isProcessing ? "Authenticating..." : "Authenticate Voter"}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Your Candidate</Label>
                <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value={candidate.id} id={candidate.id} />
                      <div className="flex-1">
                        <Label htmlFor={candidate.id} className="font-medium cursor-pointer">
                          {candidate.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button onClick={encryptVote} className="w-full" disabled={!selectedCandidate}>
                Continue to Encryption
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Your vote is being encrypted using homomorphic encryption and signed with a ring signature to ensure
                  anonymity while maintaining verifiability.
                </AlertDescription>
              </Alert>

              {isProcessing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Encrypting vote and generating ring signature...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Encrypted Vote</Label>
                    <div className="flex items-center gap-2">
                      <Input value={encryptedVote} readOnly />
                      <Badge variant="secondary">
                        <Lock className="h-3 w-3 mr-1" />
                        Encrypted
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ring Signature</Label>
                    <div className="flex items-center gap-2">
                      <Input value={ringSignature} readOnly />
                      <Badge variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Anonymous
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Cryptographic Properties:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Vote content is homomorphically encrypted</li>
                      <li>• Ring signature ensures anonymity among voter group</li>
                      <li>• Zero-knowledge proof validates eligibility</li>
                      <li>• Commitment scheme prevents vote manipulation</li>
                    </ul>
                  </div>

                  <Button onClick={submitVote} className="w-full">
                    Submit Vote to Blockchain
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your vote has been successfully submitted to the blockchain! It will be counted while maintaining your
                  complete anonymity.
                </AlertDescription>
              </Alert>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Vote Confirmation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Transaction ID:</span>
                    <span className="font-mono text-green-800">tx_abc123def456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Block Number:</span>
                    <span className="font-mono text-green-800">#1024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Timestamp:</span>
                    <span className="text-green-800">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Thank you for participating in this secure, anonymous election.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1)
                    setPrivateKey("")
                    setSelectedCandidate("")
                    setEncryptedVote("")
                    setRingSignature("")
                    setVoteSubmitted(false)
                  }}
                >
                  Vote Again (Different Voter)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
