"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SnakeSegment {
  x: number;
  y: number;
}

interface Food {
  x: number;
  y: number;
}

export function SnakeGameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Game variables
    const gridSize = 20;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);

    // Start with a longer snake
    let snake: SnakeSegment[] = [
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2) - 1, y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2) - 2, y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2) - 3, y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2) - 4, y: Math.floor(rows / 2) },
    ];
    let foods: Food[] = [];
    let direction = { x: 1, y: 0 };
    let gameSpeed = 120;
    let lastTime = 0;
    let isCurrentlyScrolling = false;

    // Generate random food position
    const generateFood = (): Food => {
      let newFood: Food;
      do {
        newFood = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
      } while (
        snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        ) ||
        foods.some((food) => food.x === newFood.x && food.y === newFood.y)
      );
      return newFood;
    };

    // Initialize multiple foods
    const initializeFoods = () => {
      foods = [];
      for (let i = 0; i < 5; i++) {
        foods.push(generateFood());
      }
    };

    // Initialize foods
    initializeFoods();

    // Game loop
    const gameLoop = (currentTime: number) => {
      if (currentTime - lastTime > gameSpeed && !isCurrentlyScrolling) {
        // Move snake
        const newHead = {
          x: snake[0].x + direction.x,
          y: snake[0].y + direction.y,
        };

        // Wrap around edges
        if (newHead.x < 0) newHead.x = cols - 1;
        if (newHead.x >= cols) newHead.x = 0;
        if (newHead.y < 0) newHead.y = rows - 1;
        if (newHead.y >= rows) newHead.y = 0;

        snake.unshift(newHead);

        // Check if food is eaten
        const foodIndex = foods.findIndex(
          (food) => food.x === newHead.x && food.y === newHead.y
        );
        if (foodIndex !== -1) {
          // Remove eaten food and add new one
          foods.splice(foodIndex, 1);
          foods.push(generateFood());
          // Increase speed slightly
          gameSpeed = Math.max(50, gameSpeed - 2);
          // Don't pop the tail - this makes the snake grow!
        } else {
          snake.pop();
        }

        // Keep snake at reasonable length for performance
        if (snake.length > 30) {
          snake.pop();
        }

        // Smart direction change - try to move towards food (reduced frequency since user can control)
        if (Math.random() < 0.02) {
          const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
          ];

          // Try to move towards nearest food
          if (foods.length > 0) {
            const nearestFood = foods.reduce((nearest, current) => {
              const nearestDist =
                Math.abs(nearest.x - snake[0].x) +
                Math.abs(nearest.y - snake[0].y);
              const currentDist =
                Math.abs(current.x - snake[0].x) +
                Math.abs(current.y - snake[0].y);
              return currentDist < nearestDist ? current : nearest;
            });

            const dx = nearestFood.x - snake[0].x;
            const dy = nearestFood.y - snake[0].y;

            let preferredDirection = direction;
            if (Math.abs(dx) > Math.abs(dy)) {
              // Move horizontally towards food
              preferredDirection = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
            } else {
              // Move vertically towards food
              preferredDirection = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
            }

            // Don't reverse direction
            if (
              preferredDirection.x !== -direction.x ||
              preferredDirection.y !== -direction.y
            ) {
              direction = preferredDirection;
            } else {
              // If preferred direction would reverse, choose random valid direction
              const validDirections = directions.filter(
                (d) => d.x !== -direction.x || d.y !== -direction.y
              );
              if (validDirections.length > 0) {
                direction =
                  validDirections[
                    Math.floor(Math.random() * validDirections.length)
                  ];
              }
            }
          }
        }

        lastTime = currentTime;
      }

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid (more visible)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw snake with colors that work on transparent background
      snake.forEach((segment, index) => {
        const alpha = 0.6 - index * 0.02; // Fade tail
        ctx.fillStyle = `rgba(34, 197, 94, ${Math.max(0.2, alpha)})`;
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });

      // Draw all foods with good contrast
      ctx.fillStyle = "rgba(239, 68, 68, 0.7)"; // Red with good visibility
      foods.forEach((food) => {
        ctx.fillRect(
          food.x * gridSize + 2,
          food.y * gridSize + 2,
          gridSize - 4,
          gridSize - 4
        );
      });

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    // Keyboard controls
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      // Arrow keys and WASD controls
      if (key === "arrowup" || key === "w") {
        // Move up (don't reverse direction)
        if (direction.y !== 1) {
          direction = { x: 0, y: -1 };
        }
      } else if (key === "arrowdown" || key === "s") {
        // Move down (don't reverse direction)
        if (direction.y !== -1) {
          direction = { x: 0, y: 1 };
        }
      } else if (key === "arrowleft" || key === "a") {
        // Move left (don't reverse direction)
        if (direction.x !== 1) {
          direction = { x: -1, y: 0 };
        }
      } else if (key === "arrowright" || key === "d") {
        // Move right (don't reverse direction)
        if (direction.x !== -1) {
          direction = { x: 1, y: 0 };
        }
      }
    };

    // Scroll detection
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      isCurrentlyScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isCurrentlyScrolling = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden hidden md:block">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-50"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
