import React from 'react';
import BootstrapCarousel from '../BootstrapCarousel/BootstrapCarousel';
import styles from './Home.module.css';
/***HOME PAGE */
const Home = () => {
    return (
        <div className={styles.Home}>    
            <BootstrapCarousel />{/* Carousel */}
                <article className={styles.ParaContent}>
                    <h2>Lorem ipsum</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie dui non 
                        vestibulum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas 
                        lacinia commodo elementum. Curabitur nisl elit, tristique eu felis id, accumsan ullamcorper nunc. 
                        Morbi sed rhoncus ligula. Praesent eget leo imperdiet sapien bibendum dignissim. Ut eu ante rutrum, 
                        accumsan nulla vulputate, convallis urna. Aenean in ex ac velit venenatis porttitor. Nunc vel semper 
                        mauris. Mauris vulputate molestie dolor, quis mollis nisi aliquam eget. Sed id mattis quam.
                    </p>
                    <p>
                        Aenean non tempor enim. Nullam in lectus neque. Praesent suscipit lacus ac nisl sodales maximus. 
                        Etiam euismod nibh massa, et suscipit turpis hendrerit malesuada. Vestibulum quis justo eu lectus 
                        volutpat tempor. Etiam libero sem, aliquet ac lorem quis, placerat sodales quam. Donec in lobortis est, 
                        id vehicula leo. Suspendisse dignissim, ante a convallis ultricies, libero nunc mattis libero, vel 
                        tempor nisi velit at sapien.
                    </p>
                </article>
            <div className={styles.Aside}>{/***Latest News tab */}
                <h4>Latest News</h4>
                <ul>
                    <li><a href="/careers">Recruitment for the post of XYZ</a></li>
                </ul>
            </div>
            <article className={styles.SecondArticle}>
                    <h3>Aliquam sagittis</h3>
                    <p>
                        Nam nisl justo, volutpat a egestas at, eleifend eget sem. Donec eu lorem tristique, semper est non, 
                        sodales elit. In sed urna vestibulum, sollicitudin turpis eu, dapibus elit. Morbi et urna felis. Phasellus 
                        ac tempus arcu. Vivamus ut dignissim nunc. Integer quis convallis velit, ut rutrum felis.
                    </p>    
            </article>
        </div>    
    );
}
export default Home;