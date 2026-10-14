

        // Database of simulated flight routes

        const volsData = {

            'CMN-PAR': [

                {
                    prix: 2499,
                    heure_depart: '08:00',
                    heure_arrivee: '13:30',
                    duree: '3h30',
                    avion: 'Boeing 787 Dreamliner',
                    classe: 'Business Class'
                },

                {
                    prix: 2899,
                    heure_depart: '14:30',
                    heure_arrivee: '20:00',
                    duree: '3h30',
                    avion: 'Airbus A350-900',
                    classe: 'First Class'
                }

            ],

            'RAI-LON': [

                {
                    prix: 4199,
                    heure_depart: '10:15',
                    heure_arrivee: '14:45',
                    duree: '4h30',
                    avion: 'Boeing 787-9',
                    classe: 'First Class'
                }

            ],

            'TTU-MAD': [

                {
                    prix: 1299,
                    heure_depart: '09:45',
                    heure_arrivee: '11:15',
                    duree: '1h30',
                    avion: 'Embraer E195-E2',
                    classe: 'Business Class'
                }

            ]

        };


        let selectedClass = 'Economy';


        // Switch Trip Types

        function switchTripType(type, element) {

            document
                .querySelectorAll('.search-tab-btn')
                .forEach(btn =>
                    btn.classList.remove('active')
                );

            element.classList.add('active');

            const returnCol =
                document.getElementById('returnDateCol');

            if (type === 'oneWay') {

                returnCol.style.opacity = '0.4';

                document
                    .getElementById('date_retour')
                    .disabled = true;

            } else {

                returnCol.style.opacity = '1';

                document
                    .getElementById('date_retour')
                    .disabled = false;

            }

        }


        // Set cabin class

        function setClass(className, element) {

            document
                .querySelectorAll('.class-badge-btn')
                .forEach(btn =>
                    btn.classList.remove('active')
                );

            element.classList.add('active');

            selectedClass = className;

        }


        // Custom notification

        function showToast(title, body) {

            const toast =
                document.getElementById('customToast');

            document.getElementById('toastTitle').innerText =
                title;

            document.getElementById('toastBody').innerText =
                body;

            toast.style.display = 'block';

            toast.classList.remove(
                'animate__fadeOutRight'
            );

            toast.classList.add(
                'animate__fadeInRight'
            );


            setTimeout(() => {

                hideToast();

            }, 5000);

        }


        function hideToast() {

            const toast =
                document.getElementById('customToast');

            toast.classList.remove(
                'animate__fadeInRight'
            );

            toast.classList.add(
                'animate__fadeOutRight'
            );

            setTimeout(() => {

                toast.style.display = 'none';

            }, 500);

        }


        // Navbar scrolling visual effect

        window.addEventListener('scroll', () => {

            const navbar =
                document.querySelector('.navbar-luxury');

            if (window.scrollY > 80) {

                navbar.classList.add('scrolled');

            } else {

                navbar.classList.remove('scrolled');

            }

        });


        // Search Form Event Listener

        document
            .getElementById('searchForm')
            .addEventListener('submit', function(e) {

                e.preventDefault();

                const depart =
                    document.getElementById('depart').value;

                const arrivee =
                    document.getElementById('arrivee').value;

                const key =
                    depart + '-' + arrivee;


                const results =
                    document.getElementById('results');

                const loading =
                    document.getElementById('loading');

                const resultsContent =
                    document.getElementById('resultsContent');


                results.style.display = 'block';

                loading.style.display = 'block';

                resultsContent.innerHTML = '';


                results.scrollIntoView({
                    behavior: 'smooth'
                });


                setTimeout(() => {

                    loading.style.display = 'none';


                    if (volsData[key]) {

                        let html = `
                            <h4 class="mb-4 brand-font text-warning">
                                <i class="fas fa-check-circle me-2"></i>
                                ${volsData[key].length}
                                Vol(s) VIP disponible(s)
                            </h4>
                        `;


                        volsData[key].forEach(
                            (vol, index) => {

                            html += `

                            <div class="flight-result-card animate__animated animate__fadeInUp">

                                <div class="row align-items-center">

                                    <div class="col-md-3 text-center border-end border-secondary border-opacity-25 py-2">

                                        <i class="fas fa-plane-up fa-2x text-warning mb-2"></i>

                                        <div class="fw-bold text-white fs-6">

                                            ${vol.avion}

                                        </div>

                                        <small class="badge bg-warning text-dark mt-1">

                                            ${selectedClass}

                                        </small>

                                    </div>


                                    <div class="col-md-6 py-2">

                                        <div class="d-flex align-items-center justify-content-between mb-2">

                                            <h5 class="brand-font mb-0 text-white">

                                                ${depart}

                                            </h5>


                                            <div class="text-center px-3">

                                                <small class="text-white-50 d-block">

                                                    <i class="fas fa-clock me-1"></i>

                                                    ${vol.duree}

                                                </small>


                                                <i class="fas fa-long-arrow-alt-right text-warning fs-4"></i>

                                            </div>


                                            <h5 class="brand-font mb-0 text-white">

                                                ${arrivee}

                                            </h5>

                                        </div>


                                        <div class="d-flex justify-content-between text-white-50 fs-7">

                                            <span>

                                                Départ:

                                                <strong class="text-white">

                                                    ${vol.heure_depart}

                                                </strong>

                                            </span>


                                            <span>

                                                Arrivée:

                                                <strong class="text-white">

                                                    ${vol.heure_arrivee}

                                                </strong>

                                            </span>

                                        </div>

                                    </div>


                                    <div class="col-md-3 text-md-end py-2">

                                        <div class="price-tag mb-2">

                                            ${vol.prix} MAD

                                        </div>


                                        <button
                                            class="btn btn-gold-action"
                                            onclick="showReservation('${key}', ${index})">

                                            Réserver

                                            <i class="fas fa-chevron-right ms-1"></i>

                                        </button>

                                    </div>

                                </div>

                            </div>

                            `;

                        });


                        resultsContent.innerHTML = html;

                    } else {

                        resultsContent.innerHTML = `

                        <div
                            class="text-center py-5 rounded"
                            style="
                            background: #F7FAFC;
                            border: 1px solid #DCE8EE;
                            ">

                            <i
                                class="fas fa-exclamation-triangle text-warning fa-3x mb-3">
                            </i>


                            <h4 class="brand-font text-white">

                                Aucun itinéraire disponible

                            </h4>


                            <p class="text-white-50">

                                Aucun vol direct trouvé pour ces
                                critères spécifiques. Contactez
                                notre service Concierge 24/7 pour
                                réserver un jet privé.

                            </p>

                        </div>

                        `;

                    }

                }, 1200);

            });


        // Show Modal

        function showReservation(volKey, index = 0) {

            const modal =
                new bootstrap.Modal(
                    document.getElementById('reservationModal')
                );

            document.getElementById('volSelect').value =
                volKey.replace('-', ' → ')
                + ` (${selectedClass})`;

            modal.show();

        }


        // Confirm Reservation

        function confirmReservation() {

            const nom =
                document.getElementById('nom').value;

            const email =
                document.getElementById('email').value;


            if (!nom || !email) {

                showToast(
                    "Information manquante",
                    "Veuillez renseigner votre nom et votre email."
                );

                return;
            }


            bootstrap.Modal
                .getInstance(
                    document.getElementById('reservationModal')
                )
                .hide();


            showToast(
                "Réservation Confirmée !",
                `Cher ${nom}, votre vol est réservé. Un email de confirmation a été envoyé à ${email}.`
            );


            document
                .getElementById('reservationForm')
                .reset();

        }


        // Initial dates setup

        const today =
            new Date()
                .toISOString()
                .split('T')[0];

        document.getElementById('date_aller').min =
            today;

        document.getElementById('date_retour').min =
            today;

        document.getElementById('date_aller').value =
            today;

   