from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173")

    # Wait for initial load and some animation (skip loader)
    page.wait_for_timeout(5000)

    # Take initial screenshot of hero section
    page.screenshot(path="/home/jules/verification/screenshots/verification2.png")

    # Scroll down to About section
    page.evaluate("window.scrollBy(0, window.innerHeight)")
    page.wait_for_timeout(1500)


    # Wait for initial load and some animation (skip loader)
    page.wait_for_timeout(5000)

    # Take initial screenshot of hero section
    page.screenshot(path="/home/jules/verification/screenshots/verification2.png")

    # Scroll down to About section
    page.evaluate("window.scrollBy(0, window.innerHeight)")
    page.wait_for_timeout(1500)

    # Scroll down to Projects section
    page.evaluate("window.scrollBy(0, window.innerHeight)")
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/projects.png")

    # Scroll down to Stack section to verify no cybersecurity
    page.evaluate("window.scrollBy(0, window.innerHeight * 2)")
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/stack.png")


    page.wait_for_timeout(2000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)


    with sync_playwright() as p:
        # Load the page, set session storage to skip loader
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        page.goto("http://localhost:5173")
        page.evaluate("sessionStorage.setItem('portfolio:loader-played', '1')")


        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
