document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "techsoluciones-services";

    const defaultServices = [
        {
            id: "web-dev",
            title: "Desarrollo web",
            price: "600.000 COP",
            shortDescription: "Aplicaciones web modernas y responsivas",
            longDescription: "Dise&ntilde;amos y desarrollamos sitios y aplicaciones web adaptables, optimizadas para rendimiento y SEO.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "5 proyectos",
            image: "Images/Desarrollo web.jpg"
        },
        {
            id: "mobile-dev",
            title: "Desarrollo M&oacute;vil",
            price: "600.000 COP",
            shortDescription: "Aplicaciones nativas para iOS y Android",
            longDescription: "Publica tu app en los principales marketplaces con un desempe&ntilde;o impecable y mantenimiento continuo.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "3 proyectos",
            image: "Images/Desarrollo movil.jpg"
        },
        {
            id: "database",
            title: "Base de Datos",
            price: "300.000 COP",
            shortDescription: "Dise&ntilde;o y administraci&oacute;n de bases de datos",
            longDescription: "Modelamos, implementamos y monitoreamos tus datos para asegurar disponibilidad y escalabilidad.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "6 servicios",
            image: "Images/Bases de datos.jpg"
        },
        {
            id: "cybersecurity",
            title: "Ciberseguridad",
            price: "450.000 COP",
            shortDescription: "Auditor&iacute;as y consultor&iacute;a en seguridad inform&aacute;tica",
            longDescription: "Protegemos tu infraestructura con evaluaciones de riesgo, hardening y monitoreo continuo.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "8 servicios",
            image: "Images/Ciberseguridad.jpg"
        },
        {
            id: "cloud",
            title: "Cloud Computing",
            price: "1.200.000 COP",
            shortDescription: "Migraci&oacute;n y gesti&oacute;n de infraestructura en la nube",
            longDescription: "Aprovecha la elasticidad de la nube con arquitecturas seguras, eficientes y automatizadas.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "4 proyectos",
            image: "Images/Cloud computing.jpg"
        },
        {
            id: "consulting",
            title: "Consultor&iacute;a IT",
            price: "150.000 COP",
            shortDescription: "Acompa&ntilde;amiento estrat&eacute;gico para equipos de TI",
            longDescription: "Impulsa tus iniciativas tecnol&oacute;gicas con asesor&iacute;a experta, roadmaps y evaluaciones de madurez.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "10 sesiones",
            image: "Images/Consultoria IT.jpg"
        },
        {
            id: "ecommerce",
            title: "E-commerce",
            price: "500.000 COP",
            shortDescription: "Tiendas en l&iacute;nea seguras y escalables",
            longDescription: "Lanza tu canal digital con plataformas robustas, integraciones y anal&iacute;tica de conversi&oacute;n.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "4 tiendas",
            image: "Images/E-commerce.jpg"
        },
        {
            id: "automation",
            title: "Automatizaci&oacute;n",
            price: "200.000 COP",
            shortDescription: "Integraci&oacute;n de procesos con herramientas digitales",
            longDescription: "Automatizamos tareas repetitivas y conectamos sistemas mediante flujos sin fricci&oacute;n.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "6 procesos",
            image: "Images/Automatizacion.jpg"
        },
        {
            id: "analytics",
            title: "Anal&iacute;tica de Datos",
            price: "350.000 COP",
            shortDescription: "Tableros e informes para decisiones basadas en datos",
            longDescription: "Centraliza informaci&oacute;n y genera visualizaciones accionables con indicadores personalizados.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "7 tableros",
            image: "Images/Analitica de datos.jpg"
        },
        {
            id: "support",
            title: "Soporte T&eacute;cnico",
            price: "250.000 COP",
            shortDescription: "Mesa de ayuda y mantenimiento preventivo",
            longDescription: "Resolvemos incidencias y cuidamos tus activos digitales con monitoreo y soporte extendido.",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "24/7",
            image: "Images/Soporte tecnico.jpg"
        }
    ];

    const cloneServices = data => data.map(service => ({ ...service }));

    const loadServicesData = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    return cloneServices(parsed);
                }
                if (parsed && Array.isArray(parsed.services)) {
                    return cloneServices(parsed.services);
                }
            }
        } catch (error) {
            console.warn("No se pudieron cargar servicios guardados", error);
        }
        return cloneServices(defaultServices);
    };

    const persistServicesData = updated => {
        const cloned = cloneServices(updated);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloned));
        } catch (error) {
            console.warn("No se pudieron guardar los servicios", error);
        }
        return cloned;
    };

    let servicesData = loadServicesData();

    try {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(servicesData));
        }
    } catch (error) {
        console.warn("No se pudo inicializar el almacenamiento de servicios", error);
    }

    const refreshServicesData = nextData => {
        servicesData = persistServicesData(nextData);
    };

    const getServiceById = serviceId => servicesData.find(item => item.id === serviceId);

    const slides = Array.from(document.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
    const nextButton = document.querySelector(".hero-control.next");
    const prevButton = document.querySelector(".hero-control.prev");

    if (slides.length > 0 && nextButton && prevButton) {
        let currentSlide = slides.findIndex(slide => slide.classList.contains("active"));
        currentSlide = currentSlide >= 0 ? currentSlide : 0;

        const showSlide = index => {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });

            currentSlide = index;
        };

        const goToNext = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        const goToPrev = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };

        nextButton.addEventListener("click", goToNext);
        prevButton.addEventListener("click", goToPrev);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index));
        });

        setInterval(goToNext, 7000);
    }

    const servicesGrid = document.getElementById("servicesGrid");
    const serviceModal = document.getElementById("serviceModal");

    if (servicesGrid && serviceModal) {
        const modalTitle = document.getElementById("modalTitle");
        const modalPrice = document.getElementById("modalPrice");
        const modalDescription = document.getElementById("modalDescription");
        const modalAvailabilityLabel = document.getElementById("modalAvailabilityLabel");
        const modalAvailabilityValue = document.getElementById("modalAvailabilityValue");
        const modalImage = document.getElementById("modalImage");
        const serviceModalClose = serviceModal.querySelector(".modal-close");
        let lastFocusedElement = null;

        const renderServices = () => {
            servicesGrid.innerHTML = "";

            if (!servicesData.length) {
                servicesGrid.innerHTML = "<p class=\"card-description\">No hay servicios disponibles.</p>";
                return;
            }

            servicesData.forEach(service => {
                const card = document.createElement("article");
                card.className = "service-card";
                card.innerHTML = `
                    <div class="card-thumb">
                        <img src="${service.image}" alt="${service.title}">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${service.title}</h3>
                        <span class="card-price">${service.price}</span>
                        <p class="card-description">${service.shortDescription}</p>
                        <a class="card-link" href="#" data-service-id="${service.id}">Ver detalle</a>
                    </div>
                `;
                servicesGrid.appendChild(card);
            });
        };

        const openServiceModal = service => {
            modalTitle.textContent = service.title;
            modalPrice.textContent = service.price;
            modalDescription.innerHTML = service.longDescription || service.shortDescription;
            modalAvailabilityLabel.textContent = service.availabilityLabel || "Disponibilidad";
            modalAvailabilityValue.innerHTML = service.availabilityValue || "";

            if (service.image) {
                modalImage.src = service.image;
                modalImage.alt = service.title;
            } else {
                modalImage.removeAttribute("src");
                modalImage.alt = "";
            }

            serviceModal.removeAttribute("hidden");
            serviceModal.setAttribute("aria-hidden", "false");
            requestAnimationFrame(() => {
                serviceModal.classList.add("active");
            });

            serviceModalClose.focus();
        };

        const closeServiceModal = () => {
            serviceModal.classList.remove("active");
            serviceModal.setAttribute("aria-hidden", "true");
            setTimeout(() => {
                if (!serviceModal.classList.contains("active")) {
                    serviceModal.setAttribute("hidden", "");
                    if (lastFocusedElement) {
                        lastFocusedElement.focus();
                    }
                }
            }, 200);
        };

        servicesGrid.addEventListener("click", event => {
            const trigger = event.target.closest(".card-link");

            if (!trigger) {
                return;
            }

            event.preventDefault();

            const serviceId = trigger.getAttribute("data-service-id");
            const service = getServiceById(serviceId);

            if (!service) {
                return;
            }

            lastFocusedElement = trigger;
            openServiceModal(service);
        });

        serviceModal.addEventListener("click", event => {
            if (event.target === serviceModal) {
                closeServiceModal();
            }
        });

        serviceModalClose.addEventListener("click", closeServiceModal);

        window.addEventListener("keydown", event => {
            if (event.key === "Escape" && !serviceModal.hasAttribute("hidden")) {
                closeServiceModal();
            }
        });

        renderServices();
    }

    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const loginClose = loginModal ? loginModal.querySelector(".modal-close") : null;
    const loginFeedback = document.getElementById("loginFeedback");
    const loginEmailInput = document.getElementById("loginEmail");
    const loginPasswordInput = document.getElementById("loginPassword");
    const loginTriggers = document.querySelectorAll(".btn-login");

    const ADMIN_EMAIL = "administrativo@correo.com";
    const ADMIN_PASSWORD = "Admin123";

    if (loginModal && loginForm && loginClose) {
        let lastLoginTrigger = null;

        const resetLoginFeedback = () => {
            if (loginFeedback) {
                loginFeedback.textContent = "";
                loginFeedback.classList.remove("success");
            }
        };

        const openLoginModal = trigger => {
            lastLoginTrigger = trigger || null;
            resetLoginFeedback();
            loginForm.reset();

            loginModal.removeAttribute("hidden");
            loginModal.setAttribute("aria-hidden", "false");
            requestAnimationFrame(() => {
                loginModal.classList.add("active");
            });

            if (loginEmailInput) {
                loginEmailInput.focus();
            }
        };

        const closeLoginModal = () => {
            loginModal.classList.remove("active");
            loginModal.setAttribute("aria-hidden", "true");
            setTimeout(() => {
                if (!loginModal.classList.contains("active")) {
                    loginModal.setAttribute("hidden", "");
                    if (lastLoginTrigger) {
                        lastLoginTrigger.focus();
                    }
                }
            }, 200);
        };

        loginTriggers.forEach(trigger => {
            trigger.addEventListener("click", event => {
                event.preventDefault();
                openLoginModal(trigger);
            });
        });

        loginModal.addEventListener("click", event => {
            if (event.target === loginModal) {
                closeLoginModal();
            }
        });

        loginClose.addEventListener("click", closeLoginModal);

        window.addEventListener("keydown", event => {
            if (event.key === "Escape" && !loginModal.hasAttribute("hidden")) {
                closeLoginModal();
            }
        });

        loginForm.addEventListener("submit", event => {
            event.preventDefault();

            const emailValue = loginEmailInput ? loginEmailInput.value.trim() : "";
            const passwordValue = loginPasswordInput ? loginPasswordInput.value : "";

            if (emailValue === ADMIN_EMAIL && passwordValue === ADMIN_PASSWORD) {
                if (loginFeedback) {
                    loginFeedback.textContent = "Acceso correcto. Redirigiendo...";
                    loginFeedback.classList.add("success");
                }
                setTimeout(() => {
                    window.location.href = "admin.html";
                }, 800);
            } else {
                if (loginFeedback) {
                    loginFeedback.textContent = "Credenciales incorrectas. Intenta nuevamente.";
                    loginFeedback.classList.remove("success");
                }
            }
        });
    }

    const adminServicesList = document.getElementById("adminServicesList");

    if (adminServicesList) {
        const buildInputField = (labelText, inputElement) => {
            const wrapper = document.createElement("label");
            wrapper.className = "admin-field";
            const span = document.createElement("span");
            span.className = "admin-field-label";
            span.textContent = labelText;
            wrapper.appendChild(span);
            wrapper.appendChild(inputElement);
            return wrapper;
        };

        const renderAdminServices = () => {
            adminServicesList.innerHTML = "";

            if (!servicesData.length) {
                const emptyState = document.createElement("p");
                emptyState.className = "admin-empty";
                emptyState.textContent = "No hay servicios para mostrar.";
                adminServicesList.appendChild(emptyState);
                return;
            }

            servicesData.forEach(service => {
                const form = document.createElement("form");
                form.className = "admin-service-card";
                form.dataset.serviceId = service.id;

                const media = document.createElement("div");
                media.className = "admin-card-media";
                const thumb = document.createElement("img");
                thumb.src = service.image;
                thumb.alt = service.title;
                media.appendChild(thumb);

                const fields = document.createElement("div");
                fields.className = "admin-card-fields";

                const idTag = document.createElement("p");
                idTag.className = "admin-id";
                idTag.textContent = `ID: ${service.id}`;
                fields.appendChild(idTag);

                const titleInput = document.createElement("input");
                titleInput.className = "admin-input";
                titleInput.name = "title";
                titleInput.value = service.title;
                fields.appendChild(buildInputField("Nombre del servicio", titleInput));

                const priceInput = document.createElement("input");
                priceInput.className = "admin-input";
                priceInput.name = "price";
                priceInput.value = service.price;
                fields.appendChild(buildInputField("Precio", priceInput));

                const shortInput = document.createElement("input");
                shortInput.className = "admin-input";
                shortInput.name = "shortDescription";
                shortInput.value = service.shortDescription;
                fields.appendChild(buildInputField("Descripci&oacute;n corta", shortInput));

                const longTextarea = document.createElement("textarea");
                longTextarea.className = "admin-textarea";
                longTextarea.name = "longDescription";
                longTextarea.value = service.longDescription || "";
                fields.appendChild(buildInputField("Descripci&oacute;n larga", longTextarea));

                const availabilityGroup = document.createElement("div");
                availabilityGroup.className = "admin-field-group";

                const availabilityLabelInput = document.createElement("input");
                availabilityLabelInput.className = "admin-input";
                availabilityLabelInput.name = "availabilityLabel";
                availabilityLabelInput.value = service.availabilityLabel || "Disponibilidad";
                availabilityGroup.appendChild(buildInputField("Etiqueta de disponibilidad", availabilityLabelInput));

                const availabilityValueInput = document.createElement("input");
                availabilityValueInput.className = "admin-input";
                availabilityValueInput.name = "availabilityValue";
                availabilityValueInput.value = service.availabilityValue || "";
                availabilityGroup.appendChild(buildInputField("Valor de disponibilidad", availabilityValueInput));

                fields.appendChild(availabilityGroup);

                const imageInput = document.createElement("input");
                imageInput.className = "admin-input";
                imageInput.name = "image";
                imageInput.value = service.image;
                fields.appendChild(buildInputField("Ruta de la imagen", imageInput));

                imageInput.addEventListener("input", () => {
                    const newValue = imageInput.value.trim();
                    thumb.src = newValue || service.image;
                });

                const actions = document.createElement("div");
                actions.className = "admin-card-actions";
                const saveButton = document.createElement("button");
                saveButton.type = "submit";
                saveButton.className = "admin-save";
                saveButton.textContent = "Guardar";
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "admin-delete";
                deleteButton.textContent = "Eliminar";
                actions.appendChild(saveButton);
                actions.appendChild(deleteButton);

                form.appendChild(media);
                form.appendChild(fields);
                form.appendChild(actions);

                form.addEventListener("submit", event => {
                    event.preventDefault();

                    const updatedService = {
                        ...service,
                        title: titleInput.value.trim() || service.title,
                        price: priceInput.value.trim() || service.price,
                        shortDescription: shortInput.value.trim() || service.shortDescription,
                        longDescription: longTextarea.value.trim() || "",
                        availabilityLabel: availabilityLabelInput.value.trim() || "Disponibilidad",
                        availabilityValue: availabilityValueInput.value.trim() || "",
                        image: imageInput.value.trim() || service.image
                    };

                    const updatedData = servicesData.map(item => (item.id === service.id ? updatedService : item));
                    refreshServicesData(updatedData);
                    renderAdminServices();
                });

                deleteButton.addEventListener("click", () => {
                    const updatedData = servicesData.filter(item => item.id !== service.id);
                    refreshServicesData(updatedData);
                    renderAdminServices();
                });

                adminServicesList.appendChild(form);
            });
        };

        renderAdminServices();
    }

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
