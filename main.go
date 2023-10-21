package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })

    r.POST("/parsePlaybook", func(c *gin.Context) {
        yamlStr := c.PostForm("playbook")
        
        playbook, err := ParsePlaybook(yamlStr)
        if err != nil {
            c.JSON(500, gin.H{"error": err.Error()})
            return
        }

        c.JSON(200, playbook)
    })
    
    r.Run(":8080")
}
