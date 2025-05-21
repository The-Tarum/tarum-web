// src/components/PostCard.jsx
"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicator

} from "@/components/ui/carousel"
import { cn } from "@/components/lib/utils"

export default function PostCard({ post: initialPost }) {
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [api, setApi] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPost((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleComment = () => setShowComments((v) => !v)
  const handleRepost = () =>
    setPost((prev) => ({ ...prev, reposts: prev.reposts + 1 }))

  const submitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setPost((prev) => ({
      ...prev,
      comments: prev.comments + 1,
      commentsList: [
        ...(prev.commentsList || []),
        {
          id: Date.now(),
          text: newComment,
          user: "You",
          timestamp: new Date().toISOString(),
        },
      ],
    }))
    setNewComment("")
  }

  useEffect(() => {
    if (!api) return

    setCurrentImage(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrentImage(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={post.userImage || ""}
              alt={post.userName}
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <AvatarFallback>{post.userName?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm">{post.userName}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {post.role} @ {post.company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4">
          <CardTitle className="text-sm font-medium">Offering</CardTitle>
          {post.items.map((item, idx) => (
            <p key={idx} className="text-sm text-secondary-foreground">
              {item}
            </p>
          ))}
          <p className="text-sm text-secondary-foreground">
            Delivery {post.delivery}
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-4 relative">
          <Carousel setApi={setApi} className="rounded overflow-hidden">
            <CarouselContent>
              {post.images.map((img, idx) => (
                <CarouselItem key={idx} className="h-48">
                  <img
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselIndicator />
          </Carousel>

        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>{post.likes} likes</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{post.comments} comments</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{post.reposts} reposts</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(isLiked && "text-blue-600")}
          >
            Like
          </Button>
          <Button variant="ghost" size="sm" onClick={handleComment}>
            Comment
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRepost}>
            Repost
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            <form onSubmit={submitComment} className="flex space-x-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit">Post</Button>
            </form>
            <div className="space-y-2">
              {post.commentsList?.map((c) => (
                <div key={c.id} className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarFallback>{c.user?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted p-2 rounded">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{c.user}</span>
                      <span>{new Date(c.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}