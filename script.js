/* ==========================================================================
   GANESH KOTHULE (AK) — PORTFOLIO JAVASCRIPT ENGINE
   Features:
   - Dynamic Multi-Theme Switcher (Cyber, Aurora, Emerald, Solar) with persistence
   - Typewriter Hero Banner Animation
   - Interactive AK AI Chatbot v2.5 (Fine-tuned on AK's projects & resume)
   - REVIVE AI Revenue Recovery Agent Interactive Live Simulator
   - WeFeed Mobile Mockup Modal
   - Actionable Contact Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Multi-Theme Switcher (Different CSS Designs)
    // ==========================================
    const themeBtn = document.getElementById('theme-btn');
    const themeMenu = document.getElementById('theme-menu');
    const themeItems = document.querySelectorAll('.theme-menu-item');
    const currentThemeLabel = document.getElementById('theme-current-name');
    const themeLabels = {
        amber: 'Amber Signal',
        blue: 'Cool Blue',
        sage: 'Muted Sage',
        indigo: 'Quantum Indigo'
    };

    // Load saved theme or default to 'amber'
    const savedTheme = localStorage.getItem('ak_portfolio_theme') || 'amber';
    applyTheme(savedTheme);

    function applyTheme(themeKey) {
        if (!themeLabels[themeKey]) themeKey = 'amber';
        document.documentElement.setAttribute('data-theme', themeKey);
        if (currentThemeLabel) currentThemeLabel.textContent = themeLabels[themeKey];

        themeItems.forEach(item => {
            if (item.getAttribute('data-theme') === themeKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        localStorage.setItem('ak_portfolio_theme', themeKey);
    }

    if (themeBtn && themeMenu) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('show');
            const caret = themeBtn.querySelector('.caret');
            if (caret) {
                caret.style.transform = themeMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        themeItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedTheme = item.getAttribute('data-theme');
                applyTheme(selectedTheme);
                themeMenu.classList.remove('show');
                const caret = themeBtn.querySelector('.caret');
                if (caret) caret.style.transform = 'rotate(0deg)';
            });
        });

        document.addEventListener('click', (e) => {
            if (!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
                themeMenu.classList.remove('show');
                const caret = themeBtn.querySelector('.caret');
                if (caret) caret.style.transform = 'rotate(0deg)';
            }
        });
    }

    // ==========================================
    // 2. Mobile Navigation Toggle & Header Tracking
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const mainHeader = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.clientHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSection = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. Hero Typewriter Animation
    // ==========================================
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        "Autonomous AI Agents (REVIVE).",
        "LLM Post-Training & RLHF (Ethara AI).",
        "Empirical AI Evaluation & Oversight.",
        "Full-Stack Python & Mobile Solutions."
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function handleTypewriter() {
        if (!typewriterElement) return;
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 30;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 65;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    handleTypewriter();

    // ==========================================
    // 4. AK AI Chatbot Engine
    // ==========================================
    const chatStream = document.getElementById('chat-stream');
    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-text-field');
    const resetChatBtn = document.getElementById('reset-chat-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    const akKnowledge = {
        greetings: "Hello! I am **AK AI**, digital twin of Ganesh Kothule. How can I help you today? You can ask about my work at Ethara AI, projects (REVIVE, WeFeed), skills, or education!",
        revive: "**REVIVE – AI Revenue Recovery Agent** (Aug 2026) is AK's flagship autonomous agent built for Razorpay Track 03 using **Next.js, TypeScript, Supabase, AI SDK, and Vercel**.\n\nKey Innovations:\n• **Policy Guard & Bounded Autonomy:** Automatically executes dunning workflows for transactions with risk score ≤ 0.65; higher risk halts for human review.\n• **Deterministic Stopping Rules:** Hard caps of 3 retries in 72h window to prevent cascading failure.\n• **Immutable Audit Trail:** Supabase logging for every agent trajectory.\n• Live Link: https://revive-ai-revenue-recovery.vercel.app/\n• GitHub: https://github.com/GaneshK07CS/Revive-ai-revenue-recovery",
        ethara: "At **Ethara AI** (March 2026 – May 2026), AK works as an **LLM Post-Training / Model Training Intern**.\n\nKey Responsibilities:\n• Precision data annotation and response labeling for RLHF-style preference dataset construction.\n• Qualitative analysis of AI-generated responses for factual groundedness, safety, and coherence.\n• Ranking paired model completions and identifying edge-case hallucinations to deliver structured failure taxonomies to training teams.",
        education: "AK's academic credentials:\n1. **Sinhgad College of Engineering, Pune** (2025–Present): B.E. Computer Engineering (Second Year) with **8.70 CGPA**.\n2. **Sanjivani K.B.P. Polytechnic, Kopargaon** (2022–2025): Diploma in Computer Technology with **First Class Distinction: 91.09%**.\n3. **Residential High School, Shevgaon** (March 2022): SSC (10th) with **88.80%**.",
        wefeed: "**WeFeed** (May 2025) is a food donation mobile platform built in **Flutter (Dart) and MySQL** connecting excess food donors (caterers, campus messes) with nearby verified NGOs to eliminate hunger and waste.",
        skills: "AK's technical skill set encompasses:\n• **AI & LLMs:** LLMs, AI Agents, RAG, Prompt Engineering, Tool Calling, Data Annotation, Response Ranking, RLHF, Policy Guardrails.\n• **Programming & Data:** Python, Java, SQL, Pandas, NumPy, Data Analysis, DSA, OOP, DBMS.\n• **Full-Stack & Cloud:** Next.js, TypeScript, Supabase, Flutter (Dart), MySQL, REST APIs, Git/GitHub, Vercel.",
        achievements: "AK's key honors & certifications:\n• **3rd Rank** in 'Code War' competitive algorithmic programming at Sanjivani K.B.P. Polytechnic (Feb 2023).\n• **Flag Hunter Cyber Hackathon** Participant (March 2025).\n• **Technical Paper Presentation on AI** authored and presented at technical summit.\n• **Industrial Software Training Certification** in Python and OOP from Thought Bliss Solutions.",
        contact: "You can reach Ganesh (AK) directly:\n• **Email:** ganeshkothule09@gmail.com\n• **Phone:** +91 9699468358\n• **WhatsApp:** https://wa.me/919699468358\n• **GitHub:** https://github.com/GaneshK07CS\n• **LinkedIn:** https://www.linkedin.com/in/ganesh-k-958a6225a\n• **Location:** Pune, Maharashtra, India",
        default: "That's an insightful question! I am fine-tuned on Ganesh's academic background (8.70 CGPA), his LLM internship at Ethara AI, and projects like **REVIVE AI Agent** and **WeFeed**. Feel free to ask about his skills in Python, AI Agents, RLHF, or how to get in touch!"
    };

    function getBotReply(input) {
        const msg = input.toLowerCase();

        if (msg.includes('revive') || msg.includes('revenue') || msg.includes('recovery') || msg.includes('agent')) {
            return akKnowledge.revive;
        }
        if (msg.includes('ethara') || msg.includes('intern') || msg.includes('experience') || msg.includes('work') || msg.includes('rlhf') || msg.includes('annotation')) {
            return akKnowledge.ethara;
        }
        if (msg.includes('education') || msg.includes('college') || msg.includes('cgpa') || msg.includes('sinhgad') || msg.includes('polytechnic') || msg.includes('diploma') || msg.includes('marks')) {
            return akKnowledge.education;
        }
        if (msg.includes('wefeed') || msg.includes('food') || msg.includes('donation') || msg.includes('flutter')) {
            return akKnowledge.wefeed;
        }
        if (msg.includes('skill') || msg.includes('python') || msg.includes('java') || msg.includes('llm') || msg.includes('stack') || msg.includes('tech')) {
            return akKnowledge.skills;
        }
        if (msg.includes('achievement') || msg.includes('certif') || msg.includes('award') || msg.includes('rank') || msg.includes('code war') || msg.includes('hackathon')) {
            return akKnowledge.achievements;
        }
        if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('hire') || msg.includes('reach') || msg.includes('whatsapp') || msg.includes('github') || msg.includes('linkedin')) {
            return akKnowledge.contact;
        }
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('greetings')) {
            return akKnowledge.greetings;
        }

        return akKnowledge.default;
    }

    function appendChatMessage(sender, text) {
        if (!chatStream) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender === 'user' ? 'user' : 'bot'}`;

        const avatar = document.createElement('div');
        avatar.className = 'bubble-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

        const textWrap = document.createElement('div');
        textWrap.className = 'bubble-text';

        let formatted = text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/• /g, '&bull; ');

        textWrap.innerHTML = `<p>${formatted}</p>`;

        bubble.appendChild(avatar);
        bubble.appendChild(textWrap);
        chatStream.appendChild(bubble);
        chatStream.scrollTop = chatStream.scrollHeight;
    }

    function showTypingIndicator() {
        if (!chatStream) return null;
        const typing = document.createElement('div');
        typing.className = 'chat-bubble bot typing-indicator-item';
        typing.innerHTML = `
            <div class="bubble-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="bubble-text">
                <div class="typing-dot-set">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatStream.appendChild(typing);
        chatStream.scrollTop = chatStream.scrollHeight;
        return typing;
    }

    function handleBotResponse(userInput) {
        const indicator = showTypingIndicator();
        setTimeout(() => {
            if (indicator) indicator.remove();
            const reply = getBotReply(userInput);
            appendChatMessage('bot', reply);
        }, 800);
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = chatInput.value.trim();
            if (!val) return;
            appendChatMessage('user', val);
            chatInput.value = '';
            handleBotResponse(val);
        });
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            appendChatMessage('user', prompt);
            handleBotResponse(prompt);
        });
    });

    if (resetChatBtn) {
        resetChatBtn.addEventListener('click', () => {
            if (chatStream) {
                chatStream.innerHTML = '';
                appendChatMessage('bot', "Conversation reset. Hello! I am **AK AI**, digital twin of Ganesh Kothule. Ask me anything about his projects, skills, or experience at Ethara AI!");
            }
        });
    }

    // ==========================================
    // 5. REVIVE Interactive Live Demo Simulator
    // ==========================================
    const openReviveBtn = document.getElementById('open-revive-modal-btn');
    const quickRunSimBtn = document.getElementById('quick-run-sim-btn');
    const reviveModal = document.getElementById('revive-modal');
    const reviveDismissBtn = document.getElementById('revive-dismiss-btn');
    const modalFooterCloseBtn = document.getElementById('modal-footer-close-btn');
    const executeAiAgentBtn = document.getElementById('execute-ai-agent-btn');
    const executeBatchSimBtn = document.getElementById('execute-batch-sim-btn');
    const agentConsoleStream = document.getElementById('agent-console-stream');
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const modalTabPanes = document.querySelectorAll('.modal-tab-pane');
    const scenarioCards = document.querySelectorAll('.scenario-card');

    const scenarioRegistry = {
        expired_card: {
            title: "Enterprise SaaS ($1,200/mo) - Expired Card",
            logs: [
                { tag: "SYS_DETECT", cls: "tag-detect", msg: "Detected Soft Decline on TX_9081 ($1,200.00 ARR). Error Code: 54 (Card Expiry)." },
                { tag: "AI_EVAL", cls: "tag-eval", msg: "LLM Root Cause Analyzer: Customer LTV score is 99.4%. Soft decline due to recurring billing token expiry." },
                { tag: "POLICY_GUARD", cls: "tag-policy", msg: "Policy Guard PG-03 Checked: Dispatch encrypted Smart Dunning link with 1-click update." },
                { tag: "ACTION_EXECUTED", cls: "tag-action", msg: "Action dispatched at optimal local time (10:15 AM). Supabase Audit ID #AUD-9912. Status: Recovered." }
            ]
        },
        insufficient_funds: {
            title: "Growth Tier ($450/mo) - Insufficient Funds",
            logs: [
                { tag: "SYS_DETECT", cls: "tag-detect", msg: "Detected Soft Decline on TX_3821 ($450.00). Error Code: 51 (Insufficient Funds)." },
                { tag: "AI_EVAL", cls: "tag-eval", msg: "LLM Recovery Schedule: Predicting optimal retry window on 1st of month at 06:00 AM." },
                { tag: "POLICY_GUARD", cls: "tag-policy", msg: "Policy Guard PG-01 Enforced: Max 3 retry velocity threshold respected (Attempt 1 of 3)." },
                { tag: "ACTION_EXECUTED", cls: "tag-action", msg: "Intelligent Retry Queued. Audit token signed. Status: 88.5% recovery probability." }
            ]
        },
        gateway_timeout: {
            title: "Custom Tier ($2,500/mo) - Gateway Timeout",
            logs: [
                { tag: "SYS_DETECT", cls: "tag-detect", msg: "Detected Transient Gateway Error 504 on primary payment processor for TX_4402." },
                { tag: "AI_EVAL", cls: "tag-eval", msg: "Autonomous Route Evaluator: Primary gateway degraded. Evaluating fallback redundant route." },
                { tag: "POLICY_GUARD", cls: "tag-policy", msg: "Policy Guard PG-04: Verifying PCI-DSS compliance on secondary gateway pipe." },
                { tag: "ACTION_EXECUTED", cls: "tag-action", msg: "Instant Fallback Reroute to Secondary Gateway successful. TX_4402 Captured ($2,500 Saved)." }
            ]
        },
        high_risk_fraud: {
            title: "High Value ($5,000/mo) - Policy Escalation Rule",
            logs: [
                { tag: "SYS_DETECT", cls: "tag-detect", msg: "Detected IP Geolocation mismatch and unusual spike on TX_7719 ($5,000.00)." },
                { tag: "AI_EVAL", cls: "tag-eval", msg: "LLM Risk Engine: Calculated Risk Score = 0.84 (> 0.65 bounded autonomy threshold)." },
                { tag: "POLICY_GUARD", cls: "tag-alert", msg: "Policy Guard PG-02 TRIGGERED: Autonomous execution halted. High Value Escalation invoked." },
                { tag: "ACTION_EXECUTED", cls: "tag-alert", msg: "Case escalated to Human Compliance Dashboard with AI incident summary and audit logs." }
            ]
        }
    };

    let activeScenarioKey = 'expired_card';

    scenarioCards.forEach(card => {
        card.addEventListener('click', () => {
            scenarioCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            activeScenarioKey = card.getAttribute('data-scenario');
        });
    });

    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalTabBtns.forEach(b => b.classList.remove('active'));
            modalTabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const pane = document.getElementById(`pane-${tabId}`);
            if (pane) pane.classList.add('active');
        });
    });

    function runAgentSimulation() {
        if (!agentConsoleStream) return;

        // Switch to Agent Execution Tab
        modalTabBtns.forEach(b => b.classList.remove('active'));
        modalTabPanes.forEach(p => p.classList.remove('active'));
        if (modalTabBtns[0]) modalTabBtns[0].classList.add('active');
        const execPane = document.getElementById('pane-agent-execution');
        if (execPane) execPane.classList.add('active');

        agentConsoleStream.innerHTML = '';
        const data = scenarioRegistry[activeScenarioKey];
        if (!data) return;

        const timeNow = new Date().toTimeString().split(' ')[0];
        agentConsoleStream.innerHTML += `
            <div class="console-item ready-item">
                <span class="c-time">[${timeNow}]</span>
                <span class="c-tag tag-ready">AGENT_START</span>
                <span>Initializing REVIVE workflow for scenario: <strong>${data.title}</strong>...</span>
            </div>
        `;

        data.logs.forEach((item, idx) => {
            setTimeout(() => {
                const now = new Date().toTimeString().split(' ')[0];
                const line = document.createElement('div');
                line.className = 'console-item';
                line.innerHTML = `
                    <span class="c-time">[${now}]</span>
                    <span class="c-tag ${item.cls}">${item.tag}</span>
                    <span>${item.msg}</span>
                `;
                agentConsoleStream.appendChild(line);
                agentConsoleStream.scrollTop = agentConsoleStream.scrollHeight;
            }, (idx + 1) * 600);
        });
    }

    if (executeAiAgentBtn) {
        executeAiAgentBtn.addEventListener('click', runAgentSimulation);
    }

    if (executeBatchSimBtn) {
        executeBatchSimBtn.addEventListener('click', () => {
            modalTabBtns.forEach(b => b.classList.remove('active'));
            modalTabPanes.forEach(p => p.classList.remove('active'));
            const analyticsTab = document.querySelector('[data-tab="recovery-analytics"]');
            if (analyticsTab) analyticsTab.classList.add('active');
            const analyticsPane = document.getElementById('pane-recovery-analytics');
            if (analyticsPane) analyticsPane.classList.add('active');

            const progressBox = document.getElementById('batch-progress-box');
            const fill = document.getElementById('batch-fill-bar');
            const status = document.getElementById('batch-status-msg');
            const arrEl = document.getElementById('analytics-arr');
            const rateEl = document.getElementById('analytics-rate');

            if (progressBox && fill && status) {
                progressBox.style.display = 'block';
                fill.style.width = '0%';
                status.textContent = 'Processing 50 at-risk subscription transactions in parallel...';

                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    fill.style.width = `${progress}%`;
                    if (progress >= 100) {
                        clearInterval(interval);
                        status.textContent = 'Batch completed: 44/50 transactions recovered autonomously. 2 escalated.';
                        if (arrEl) arrEl.textContent = '$64,180';
                        if (rateEl) rateEl.textContent = '88.0%';
                    }
                }, 200);
            }
        });
    }

    function openModal(m) {
        if (m) {
            m.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(m) {
        if (m) {
            m.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (openReviveBtn && reviveModal) {
        openReviveBtn.addEventListener('click', () => {
            openModal(reviveModal);
            runAgentSimulation();
        });
    }

    if (quickRunSimBtn && reviveModal) {
        quickRunSimBtn.addEventListener('click', () => {
            openModal(reviveModal);
            runAgentSimulation();
        });
    }

    if (reviveDismissBtn && reviveModal) {
        reviveDismissBtn.addEventListener('click', () => closeModal(reviveModal));
    }

    if (modalFooterCloseBtn && reviveModal) {
        modalFooterCloseBtn.addEventListener('click', () => closeModal(reviveModal));
    }

    if (reviveModal) {
        reviveModal.addEventListener('click', (e) => {
            if (e.target === reviveModal) closeModal(reviveModal);
        });
    }

    // ==========================================
    // 6. WeFeed Modal
    // ==========================================
    const openWeFeedBtn = document.getElementById('open-wefeed-modal-btn');
    const weFeedModal = document.getElementById('wefeed-modal');
    const weFeedDismissBtn = document.getElementById('wefeed-dismiss-btn');

    if (openWeFeedBtn && weFeedModal) {
        openWeFeedBtn.addEventListener('click', () => openModal(weFeedModal));
    }

    if (weFeedDismissBtn && weFeedModal) {
        weFeedDismissBtn.addEventListener('click', () => closeModal(weFeedModal));
    }

    if (weFeedModal) {
        weFeedModal.addEventListener('click', (e) => {
            if (e.target === weFeedModal) closeModal(weFeedModal);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(reviveModal);
            closeModal(weFeedModal);
        }
    });

    // ==========================================
    // 7. Actionable Contact Form
    // ==========================================
    const contactForm = document.getElementById('direct-message-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const subject = document.getElementById('form-subject').value;

            const parent = contactForm.parentElement;
            parent.innerHTML = `
                <div class="message-success-banner">
                    <i class="fa-solid fa-circle-check"></i>
                    <h3>Thank you, ${name}!</h3>
                    <p>Your message regarding <strong>"${subject}"</strong> has been recorded. You can also reach Ganesh (AK) directly at <a href="mailto:ganeshkothule09@gmail.com" style="color: var(--clr-secondary); font-weight: 600;">ganeshkothule09@gmail.com</a> or phone <strong>+91 9699468358</strong>.</p>
                </div>
            `;
        });
    }
});
