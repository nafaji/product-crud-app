FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore NFJ.InventoryManagementSystem.slnx

RUN dotnet publish NFJ.InventoryManagementSystem.Api/NFJ.InventoryManagementSystem.Api.csproj -c Release -o /app/publish --no-restore /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "NFJ.InventoryManagementSystem.Api.dll"]