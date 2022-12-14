use bevy::{prelude::*, render::render_resource::Texture};

pub struct GamePlugin;

impl Plugin for GamePlugin {
    fn build(&self, app: &mut App) {
        app.add_startup_system(startup);
    }
}

fn startup(mut commands: Commands, assets_server: Res<AssetServer>) {
    let bevy_image: Handle<Image> = assets_server.load("textures/bevy.png");
    commands.spawn(Camera2dBundle::default());
    commands.spawn(SpriteBundle {
        texture: bevy_image,
        ..default()
    });
}
