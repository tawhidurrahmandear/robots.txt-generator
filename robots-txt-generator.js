// robots.txt Generator
// developed by Tawhidur Rahman Dear, https://www.tawhidurrahmandear.com
// Live Preview available at https://www.devilhunter.net/p/robotstxt-generator.html

    document.addEventListener('DOMContentLoaded', function () {
      function updateRobotstxt() {
        var allDefault = document.getElementById('all_default').value;
        var userAgents = document.getElementById('user_agents').value.trim();
        var crawlDelay = document.getElementById('crawl_delay').value;
        var sitemapText = document.getElementById('sitemap').value.trim();
        var allowedText = document.getElementById('allowed_dirs').value.trim();
        var restrictedText = document.getElementById('restricted_dirs').value.trim();
        var blockedQueriesText = document.getElementById('blocked_queries').value.trim();
        var host = document.getElementById('host').value.trim();

        var robotstxt = "# robots.txt generated on " + new Date().toLocaleString() + "\n\n";

        // Handle User-Agents
        if (userAgents) {
          var userAgentArray = userAgents.split(',').map(function (ua) {
            return ua.trim();
          }).filter(Boolean);
          userAgentArray.forEach(function (agent) {
            robotstxt += "User-agent: " + agent + "\n";
          });
        } else {
          robotstxt += "User-agent: *\n";
        }

        // Handle all default
        if (allDefault) {
          robotstxt += "Disallow: " + allDefault + "\n";
        } else {
          // Add Allowed paths
          if (allowedText) {
            var allowedPaths = allowedText.split('\n').map(function (path) {
              return path.trim();
            }).filter(Boolean);
            allowedPaths.forEach(function (path) {
              robotstxt += "Allow: " + path + "\n";
            });
          }

          // Add Restricted paths
          if (restrictedText) {
            var restrictedPaths = restrictedText.split('\n').map(function (path) {
              return path.trim();
            }).filter(Boolean);
            restrictedPaths.forEach(function (path) {
              robotstxt += "Disallow: " + path + "\n";
            });
          }
        }

        // Add Blocked Queries
        if (blockedQueriesText) {
          var queries = blockedQueriesText.split('\n').map(function (query) {
            return query.trim();
          }).filter(Boolean);
          queries.forEach(function (query) {
            robotstxt += "Disallow: /*" + query + "\n";
          });
        }

        // Add Crawl Delay
        if (crawlDelay !== "0") {
          robotstxt += "Crawl-delay: " + crawlDelay + "\n";
        }

        // Add Sitemaps
        if (sitemapText) {
          var sitemaps = sitemapText.split('\n').map(function (sitemap) {
            return sitemap.trim();
          }).filter(Boolean);
          sitemaps.forEach(function (sitemap) {
            robotstxt += "Sitemap: " + sitemap + "\n";
          });
        }

        // Add Host
        if (host) {
          robotstxt += "Host: " + host + "\n";
        }

        // Update the result textarea
        document.getElementById('result').value = robotstxt.trim();
      }

      // Generate Button Event
      document.getElementById('generate_btn').addEventListener('click', function () {
        updateRobotstxt();
      });

      // Download Button Event
      document.getElementById('download_btn').addEventListener('click', function () {
        var blob = new Blob([document.getElementById('result').value], { type: 'text/plain' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'robots.txt';
        link.click();
      });
    });