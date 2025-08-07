import { Product } from './pages/store/models/product.model';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { CallbackComponent } from './auth/callback.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { AdminComponent } from './auth/admin/admin.component';
import { RegisterCompanyComponent } from './auth/register-company/register-company.component';
import { CompanyComponent } from './pages/company/company.component';
import { ProductAddComponent } from './pages/store/product-add/product-add.component';
import { ProductListComponent } from './pages/store/product-list/product-list.component';
import { ProductCartComponent } from './pages/store/product-cart/product-cart.component';
import { ProductFavoriteComponent } from './pages/store/product-favorite/product-favorite.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { MapComponent } from './pages/waste/map/map.component';
import { CalculatorComponent } from './pages/waste/calculator/calculator.component';
import { EducationComponent } from './pages/education/education.component';
import { BlogComponent } from './pages/education/pages/blog/blog.component';
import { BlogDetailComponent } from './pages/education/pages/blog/blog-detail/blog-detail.component';
import { WritePostComponent } from './pages/education/pages/blog/write-post/write-post.component';

export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},

  {path: '', component: AppComponent,
    children: [
      {path: 'landing', component: LandingComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register-company', component: RegisterCompanyComponent},
      {path: 'admin', component: AdminComponent },
      {path: 'company', component: CompanyComponent},

    ]
  },
  {path: '',
    component: LayoutComponent,
    children:[
      { path: 'workspace', component: WorkspaceComponent },
      { path: 'perfil',  component: PerfilComponent},
      { path: 'notifications',  component: NotificationsComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'store', component: ProductListComponent },
      { path: 'adicionaProduto', component: ProductAddComponent },
      { path: 'cart', component: ProductCartComponent },
      { path: 'favorite', component: ProductFavoriteComponent },
      { path: 'map', component: MapComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: 'education', component: EducationComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'detalhes', component: BlogDetailComponent },
      { path: 'escrever', component: WritePostComponent },
      
      {
        path: 'produto/:id',
        loadComponent: () => import('./pages/store/product-detail/product-detail.component')
          .then(m => m.ProductDetailComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/store/product-checkout/product-checkout.component')
          .then(m => m.ProductCheckoutComponent)
      },
      
    ]
  },

  { path: 'callback', component: CallbackComponent },
  { path: '**', component: NotFoundComponent }
]

