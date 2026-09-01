using Microsoft.Extensions.AI;
using Azure.AI.OpenAI;
using System.ClientModel;

var builder = WebApplication.CreateBuilder(args);

// 1. Setup CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Enable Controllers (Enterprise routing)
builder.Services.AddControllers();

// 3. Setup AI and add it to the "Dependency Injection Toolbox"
string endpoint = "https://openai-vicky-ai-course.openai.azure.com/";
string apiKey = builder.Configuration["AzureOpenAI:ApiKey"] 
    ?? throw new Exception("API Key is missing!");

IChatClient client = new AzureOpenAIClient(new Uri(endpoint), new ApiKeyCredential(apiKey))
    .GetChatClient("gpt-5-mini")
    .AsIChatClient();

builder.Services.AddSingleton<IChatClient>(client); // Puts the AI in the toolbox!

var app = builder.Build();

app.UseCors("AllowAngular");
app.MapControllers(); // Tells the app to use our Controller files for routing

app.Run();