<?php

use Illuminate\Support\Facades\Route;

// Debug route to test if routing works
Route::get('/test', function () {
    return response()->json([
        'status' => 'ok',
        'app_debug' => config('app.debug'),
        'app_env' => config('app.env'),
        'has_app_key' => !empty(config('app.key')),
        'app_key_from_env' => env('APP_KEY') ? 'SET' : 'NOT SET',
        'app_key_length' => env('APP_KEY') ? strlen(env('APP_KEY')) : 0,
        'app_key_preview' => env('APP_KEY') ? substr(env('APP_KEY'), 0, 20) . '...' : 'NOT SET',
    ]);
});

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

// Sitemap route
Route::get('/sitemap.xml', function () {
    $siteUrl = config('app.url');
    $entries = collect();
    
    // Get all pages
    $pages = \Statamic\Facades\Entry::whereCollection('pages')->all();
    foreach ($pages as $page) {
        if ($page->published() && $page->url()) {
            $entries->push([
                'url' => $page->absoluteUrl(),
                'lastmod' => $page->lastModified()?->format('Y-m-d') ?? now()->format('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => $page->slug() === 'home' ? '1.0' : '0.8',
            ]);
        }
    }
    
    // Get all team members
    $team = \Statamic\Facades\Entry::whereCollection('team')->all();
    foreach ($team as $member) {
        if ($member->published() && $member->url()) {
            $entries->push([
                'url' => $member->absoluteUrl(),
                'lastmod' => $member->lastModified()?->format('Y-m-d') ?? now()->format('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.6',
            ]);
        }
    }
    
    // Generate XML
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    foreach ($entries as $entry) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($entry['url']) . "</loc>\n";
        $xml .= "    <lastmod>" . $entry['lastmod'] . "</lastmod>\n";
        $xml .= "    <changefreq>" . $entry['changefreq'] . "</changefreq>\n";
        $xml .= "    <priority>" . $entry['priority'] . "</priority>\n";
        $xml .= "  </url>\n";
    }
    
    $xml .= '</urlset>';
    
    return response($xml, 200)
        ->header('Content-Type', 'application/xml');
});
