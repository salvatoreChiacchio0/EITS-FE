/**
 * It contains path literals. It's used for
 * route management in {@link AppRoutingModule}
 *
 * @enum
 * @category Enum
 */
 export enum Path {
    Default = '',
    Login = 'login',
    Registration = 'registration',
    Home = 'home',    
    ChiSiamo = "chi-siamo",
    Contatti = "contatti",
    GymPage = "gym-home",
    UserPage = "user-home",
    GymCreate ="gym-create",
    GymDetails = "gym-details/:id",
    UsersGymPage ="gym-users",
    SchedePage ="schede",
    SchedaDetails = "scheda/:id",

    MembershipsPage ="memberships"
  }
  